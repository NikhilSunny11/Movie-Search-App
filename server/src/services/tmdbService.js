const axios = require('axios');
const https = require('https');
const env = require('../config/env');
const logger = require('../utils/logger');

/**
 * TMDB Service
 *
 * Encapsulates all communication with the TMDB API v3.
 * The frontend never talks to TMDB directly — this server acts as a proxy,
 * keeping the API key secure on the backend.
 */
const httpsAgent = new https.Agent({
  keepAlive: true,
  family: 4,
  timeout: 15000,
});

const tmdbClient = axios.create({
  baseURL: env.TMDB_BASE_URL,
  params: {
    api_key: env.TMDB_API_KEY,
    language: 'en-US',
  },
  timeout: 12000,
  httpsAgent,
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
  },
});

/**
 * Transient error codes that should trigger an automatic retry.
 */
const RETRYABLE_CODES = new Set([
  'ECONNRESET',
  'ETIMEDOUT',
  'ENOTFOUND',
  'ECONNABORTED',
  'EPIPE',
  'ECONNREFUSED',
]);

/**
 * Retry a TMDB request up to `maxRetries` times with exponential backoff.
 * Only retries on transient network errors or 429/5xx responses from TMDB.
 *
 * @param {Function} fn         - Async function to attempt
 * @param {number}   maxRetries - Max retry attempts (default 3)
 * @returns {Promise<any>}
 */
async function withRetry(fn, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const code = error.code;
      const status = error.response?.status;
      const isRetryable =
        RETRYABLE_CODES.has(code) ||
        status === 429 ||
        (status >= 500 && status < 600);

      if (!isRetryable || attempt === maxRetries) {
        break;
      }

      // Exponential backoff: 300ms, 600ms, 1200ms …
      const delay = Math.min(300 * Math.pow(2, attempt - 1), 3000);
      logger.warn(`TMDB request failed (${code || status}), retrying in ${delay}ms...`, {
        attempt,
        maxRetries,
      });
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

/**
 * Search media by query string.
 * @param {string} query - Search term
 * @param {number} page - Page number (default 1)
 * @param {string} type - 'movie' or 'tv'
 */
async function searchMedia(query, page = 1, type = 'movie') {
  try {
    const { data } = await withRetry(() =>
      tmdbClient.get(`/search/${type}`, {
        params: { query, page, include_adult: false },
      })
    );
    return {
      results: data.results,
      meta: {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      },
    };
  } catch (error) {
    logger.error(`TMDB search ${type} failed`, { query, error: error.message });
    throw error;
  }
}

/**
 * Get trending media (weekly).
 * @param {string} type - 'movie' or 'tv'
 * @param {number} page - Page number (default 1)
 */
async function getTrending(type = 'movie', page = 1) {
  try {
    const { data } = await withRetry(() =>
      tmdbClient.get(`/trending/${type}/week`, { params: { page } })
    );
    return {
      results: data.results,
      meta: {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      },
    };
  } catch (error) {
    logger.error(`TMDB getTrending ${type} failed`, { error: error.message });
    throw error;
  }
}

/**
 * Get detailed info for a single media item.
 * @param {number} id - TMDB ID
 * @param {string} type - 'movie' or 'tv'
 */
async function getDetails(id, type = 'movie') {
  try {
    const { data } = await withRetry(() =>
      tmdbClient.get(`/${type}/${id}`, {
        params: { append_to_response: 'credits,videos,reviews' },
      })
    );
    return data;
  } catch (error) {
    logger.error(`TMDB getDetails ${type} failed`, { id, error: error.message });
    throw error;
  }
}

/**
 * Get the list of official TMDB genres.
 * @param {string} type - 'movie' or 'tv'
 */
async function getGenres(type = 'movie') {
  try {
    const { data } = await withRetry(() =>
      tmdbClient.get(`/genre/${type}/list`)
    );
    return data.genres;
  } catch (error) {
    logger.error(`TMDB getGenres ${type} failed`, { error: error.message });
    throw error;
  }
}

/**
 * Discover media by genre.
 * @param {number} genreId - TMDB genre ID
 * @param {number} page - Page number (default 1)
 * @param {string} type - 'movie' or 'tv'
 */
async function discoverByGenre(genreId, page = 1, type = 'movie') {
  try {
    const { data } = await withRetry(() =>
      tmdbClient.get(`/discover/${type}`, {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc',
          page,
          include_adult: false,
        },
      })
    );
    return {
      results: data.results,
      meta: {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      },
    };
  } catch (error) {
    logger.error(`TMDB discoverByGenre ${type} failed`, { genreId, error: error.message });
    throw error;
  }
}

module.exports = {
  searchMedia,
  getTrending,
  getDetails,
  getGenres,
  discoverByGenre,
};
