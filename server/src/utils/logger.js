const winston = require('winston');
const path = require('path');

const logsDir = path.resolve(__dirname, '../../logs');

/**
 * Winston Logger
 * 
 * Replaces console.log throughout the backend.
 * - Console transport: Colorized, human-readable (dev mode)
 * - File transports: error.log (errors only) + combined.log (everything)
 * 
 * Usage:
 *   const logger = require('./utils/logger');
 *   logger.info('Server started on port 5000');
 *   logger.error('Failed to fetch from TMDB', { error: err.message });
 */
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'movie-search-api' },
  transports: [
    // Write errors to error.log
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs to combined.log
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// In development, also log to the console with colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length && meta.service === undefined
            ? ` ${JSON.stringify(meta)}`
            : '';
          return `${timestamp} ${level}: ${message}${metaStr}`;
        })
      ),
    })
  );
}

module.exports = logger;
