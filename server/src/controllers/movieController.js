const tmdbService = require('../services/tmdbService');
const { successResponse, errorResponse } = require('../utils/formatResponse');
const logger = require('../utils/logger');

/**
 * Movie Controller
 * 
 * Handles request validation, calls the service layer,
 * and returns standardized responses.
 */

async function search(req, res, next) {
  try {
    const { query, page, type = 'movie' } = req.query;

    if (!query || query.trim().length === 0) {
      return errorResponse(res, 'Query parameter is required.', 400);
    }

    logger.info(`Media search`, { query, page, type });
    const data = await tmdbService.searchMedia(query.trim(), parseInt(page, 10) || 1, type);
    return successResponse(res, data.results, data.meta);
  } catch (error) {
    next(error);
  }
}

async function trending(req, res, next) {
  try {
    const { type = 'movie', page } = req.query;
    logger.info(`Fetching trending ${type}`);
    const data = await tmdbService.getTrending(type, parseInt(page, 10) || 1);
    return successResponse(res, data.results, data.meta);
  } catch (error) {
    next(error);
  }
}

async function details(req, res, next) {
  try {
    const { id } = req.params;
    const { type = 'movie' } = req.query;

    if (!id || isNaN(id)) {
      return errorResponse(res, 'A valid media ID is required.', 400);
    }

    logger.info(`Fetching details`, { id, type });
    const data = await tmdbService.getDetails(parseInt(id, 10), type);
    return successResponse(res, data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return errorResponse(res, 'Movie not found.', 404);
    }
    next(error);
  }
}

async function genres(req, res, next) {
  try {
    const { type = 'movie' } = req.query;
    logger.info(`Fetching genre list for ${type}`);
    const data = await tmdbService.getGenres(type);
    return successResponse(res, data);
  } catch (error) {
    next(error);
  }
}

async function discoverByGenre(req, res, next) {
  try {
    const { genreId } = req.params;
    const { page, type = 'movie' } = req.query;

    if (!genreId || isNaN(genreId)) {
      return errorResponse(res, 'A valid genre ID is required.', 400);
    }

    logger.info(`Discovering ${type} by genre`, { genreId, page });
    const data = await tmdbService.discoverByGenre(parseInt(genreId, 10), parseInt(page, 10) || 1, type);
    return successResponse(res, data.results, data.meta);
  } catch (error) {
    next(error);
  }
}

module.exports = { search, trending, details, genres, discoverByGenre };
