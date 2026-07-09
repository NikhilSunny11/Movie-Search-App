const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Rate Limiter
 *
 * Protects the API from abuse: 500 requests per 15 minutes per IP.
 * In development mode, rate limiting is skipped entirely so normal
 * app usage never triggers the 429 error.
 * Returns a standardized error response when the limit is hit.
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Raised from 100 → 500 to avoid hitting limit during normal use
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting completely in development so you never hit 429
  skip: (req) => process.env.NODE_ENV !== 'production',
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', { ip: req.ip, url: req.originalUrl });
    res.status(429).json({
      success: false,
      data: null,
      error: 'Too many requests. Please try again in a few minutes.',
      meta: null,
    });
  },
});

module.exports = rateLimiter;
