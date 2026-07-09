const { vi } = require('vitest');

module.exports = {
  searchMedia: vi.fn(),
  getTrending: vi.fn(),
  getDetails: vi.fn(),
  getGenres: vi.fn(),
  discoverByGenre: vi.fn(),
};
