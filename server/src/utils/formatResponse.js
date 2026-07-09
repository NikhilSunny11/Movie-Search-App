/**
 * Standardized API Response Formatter
 * 
 * Every API response follows this envelope:
 * {
 *   success: boolean,
 *   data: any | null,
 *   error: string | null,
 *   meta: { page, totalPages, totalResults } | null
 * }
 */

function successResponse(res, data, meta = null, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
    meta,
  });
}

function errorResponse(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
    meta: null,
  });
}

module.exports = { successResponse, errorResponse };
