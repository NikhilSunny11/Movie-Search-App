/**
 * Integration tests for Movie API Routes.
 * Uses nock to intercept outbound TMDB HTTP requests instead of mocking
 * the service module, which avoids ESM/CJS interop issues with Vitest.
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import nock from 'nock';

import app from '../../src/server.js';

const TMDB_BASE = 'https://api.themoviedb.org';

beforeAll(() => {
  // Prevent any real network calls from leaking out
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

// ─── GET /api/health ──────────────────────────────────
describe('GET /api/health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
  });
});

// ─── GET /api/movies/search ───────────────────────────
describe('GET /api/movies/search', () => {
  it('should return 400 if query is missing', async () => {
    const res = await request(app).get('/api/movies/search');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Query parameter');
  });

  it('should return search results', async () => {
    nock(TMDB_BASE)
      .get('/3/search/movie')
      .query(true)
      .reply(200, {
        results: [{ id: 1, title: 'Inception' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

    const res = await request(app).get('/api/movies/search?query=inception');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Inception');
  });
});

// ─── GET /api/movies/trending ─────────────────────────
describe('GET /api/movies/trending', () => {
  it('should return trending movies', async () => {
    nock(TMDB_BASE)
      .get('/3/trending/movie/week')
      .query(true)
      .reply(200, {
        results: [{ id: 2, title: 'Dune' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

    const res = await request(app).get('/api/movies/trending');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
  });
});

// ─── GET /api/movies/genres ───────────────────────────
describe('GET /api/movies/genres', () => {
  it('should return genre list', async () => {
    nock(TMDB_BASE)
      .get('/3/genre/movie/list')
      .query(true)
      .reply(200, {
        genres: [
          { id: 28, name: 'Action' },
          { id: 35, name: 'Comedy' },
        ],
      });

    const res = await request(app).get('/api/movies/genres');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });
});

// ─── GET /api/movies/:id ──────────────────────────────
describe('GET /api/movies/:id', () => {
  it('should return 400 for invalid ID', async () => {
    const res = await request(app).get('/api/movies/abc');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return movie details', async () => {
    nock(TMDB_BASE)
      .get('/3/movie/550')
      .query(true)
      .reply(200, {
        id: 550,
        title: 'Fight Club',
        overview: 'An insomniac office worker...',
      });

    const res = await request(app).get('/api/movies/550');
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Fight Club');
  });
});

// ─── 404 ──────────────────────────────────────────────
describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
