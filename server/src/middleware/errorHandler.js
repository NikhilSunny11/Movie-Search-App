const logger = require('../utils/logger');
const { errorResponse } = require('../utils/formatResponse');

/**
 * Maps raw Node.js network error codes to friendly user-facing messages.
 * This ensures codes like "ECONNRESET" are never shown in the UI.
 */
const NETWORK_ERROR_MESSAGES = {
  ECONNRESET: 'Could not reach the movie database. Please try again.',
  ETIMEDOUT: 'The request timed out. Please try again.',
  ENOTFOUND: 'Could not reach the movie database. Check your internet connection.',
  ECONNABORTED: 'The request timed out. Please try again.',
  EPIPE: 'Could not reach the movie database. Please try again.',
  ECONNREFUSED: 'Could not reach the movie database. Please try again.',
};

/**
 * Global Error Handler Middleware
 *
 * Catches all unhandled errors, logs them with Winston,
 * and sends a sanitized response to the client (no stack traces in production,
 * no raw Node.js error codes ever).
 */
function errorHandler(err, req, res, _next) {
  // Log the full error details
  logger.error('Unhandled error', {
    message: err.message,
    code: err.code,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  const statusCode = err.statusCode || err.response?.status || 500;

  // Convert raw network error codes to friendly messages
  let message = NETWORK_ERROR_MESSAGES[err.code];

  if (!message) {
    message =
      process.env.NODE_ENV === 'production'
        ? 'An internal server error occurred.'
        : err.message || 'An internal server error occurred.';
  }

  return errorResponse(res, message, statusCode);
}

module.exports = errorHandler;
