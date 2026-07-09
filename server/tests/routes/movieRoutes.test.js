const { describe, it, expect, vi, beforeEach } = require('vitest');
const request = require('supertest');

// Mock the TMDB service before importing the app
vi.mock('../../src/services/tmdbService', () => ({
  searchMovies: vi.fn(),
  getTrending: vi.fn(),
  getMovieDetails: vi.fn(),
  getGenres: vi.fn(),
  discoverByGenre: vi.fn(),
}));

// Mock environment to avoid requiring real TMDB key in tests
vi.mock('../../src/config/env', () => ({
  PORT: 5000,
  NODE_ENV: 'test',
  TMDB_API_KEY: 'test-key',
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  CORS_ORIGIN: '*',
}));

const app = require('../../src/server');
const tmdbService = require('../../src/services/tmdbService');

describe('Movie API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      tmdbService.searchMovies.mockResolvedValue({
        results: [{ id: 1, title: 'Inception' }],
        meta: { page: 1, totalPages: 1, totalResults: 1 },
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
      tmdbService.getTrending.mockResolvedValue({
        results: [{ id: 2, title: 'Dune' }],
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
      tmdbService.getGenres.mockResolvedValue([
        { id: 28, name: 'Action' },
        { id: 35, name: 'Comedy' },
      ]);

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
      tmdbService.getMovieDetails.mockResolvedValue({
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
});
