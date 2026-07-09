// App Constants — Static Configuration
// WHITE-LABELING: Change the site title, default language, and other static settings here.

export const SITE_TITLE = 'CineSearch';
export const SITE_TAGLINE = 'Discover your next favorite movie';
export const DEFAULT_LANGUAGE = 'en-US';

// TMDB image base URLs
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const POSTER_SIZES = {
  small: `${TMDB_IMAGE_BASE}/w185`,
  medium: `${TMDB_IMAGE_BASE}/w342`,
  large: `${TMDB_IMAGE_BASE}/w500`,
  original: `${TMDB_IMAGE_BASE}/original`,
};
export const BACKDROP_SIZES = {
  small: `${TMDB_IMAGE_BASE}/w780`,
  large: `${TMDB_IMAGE_BASE}/w1280`,
  original: `${TMDB_IMAGE_BASE}/original`,
};

// Pagination
export const RESULTS_PER_PAGE = 20;

// Debounce delay for search input (ms)
export const SEARCH_DEBOUNCE_MS = 400;

// Placeholder poster for movies without images
export const POSTER_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="342" height="513" fill="%2313131a"%3E%3Crect width="342" height="513" rx="12"/%3E%3Ctext x="171" y="265" text-anchor="middle" fill="%2355556a" font-family="sans-serif" font-size="16"%3ENo Poster%3C/text%3E%3C/svg%3E';
