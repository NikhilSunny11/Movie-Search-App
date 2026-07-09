const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

/**
 * Movie API Routes
 * 
 * GET /api/movies/search?query=...&page=1   — Search movies
 * GET /api/movies/trending                   — Trending movies
 * GET /api/movies/genres                     — Genre list
 * GET /api/movies/genre/:genreId?page=1      — Discover by genre
 * GET /api/movies/:id                        — Movie details
 */

router.get('/search', movieController.search);
router.get('/trending', movieController.trending);
router.get('/genres', movieController.genres);
router.get('/genre/:genreId', movieController.discoverByGenre);
router.get('/:id', movieController.details);

module.exports = router;
