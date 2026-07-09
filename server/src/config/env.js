const dotenv = require('dotenv');
const path = require('path');

// Load .env from server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validated environment configuration.
 * Throws a clear error on startup if any required variable is missing.
 */
const requiredVars = ['TMDB_API_KEY'];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(
      `❌ Missing required environment variable: ${varName}\n` +
      `   → Copy .env.example to .env and fill in your values.\n` +
      `   → See docs/SETUP.md for instructions.`
    );
  }
}

const env = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

module.exports = env;
