// This runs before any test file is loaded
// Set required env vars so env.js doesn't throw
process.env.TMDB_API_KEY = 'test-key';
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.CORS_ORIGIN = '*';
