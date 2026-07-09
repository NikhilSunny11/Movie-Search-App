const cors = require('cors');
const env = require('../config/env');

/**
 * CORS Configuration
 * 
 * Allows requests only from the configured frontend origin.
 * In production, this should match your deployed frontend domain.
 */
const corsMiddleware = cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
});

module.exports = corsMiddleware;
