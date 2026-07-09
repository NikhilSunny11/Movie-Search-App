const express = require('express');
const movieRoutes = require('./movieRoutes');

const router = express.Router();

/**
 * Route Aggregator
 * 
 * All route modules are registered here.
 * Add new route files as the API grows.
 */
router.use('/movies', movieRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
});

module.exports = router;
