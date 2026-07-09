import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/tmdbClient';

/**
 * useMovies Hook
 * 
 * Encapsulates all movie data fetching logic:
 * - Search by query
 * - Trending movies (default)
 * - Filter by genre
 * 
 * @returns {Object} { movies, genres, loading, loadingMore, error, searchMovies, fetchTrending, filterByGenre, activeGenre, searchQuery, mediaType, setMediaType, loadMore, hasMore }
 */
export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('movie'); // 'movie' or 'tv'
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleMeta = (meta) => {
    if (meta) {
      setPage(meta.page);
      setHasMore(meta.page < meta.totalPages);
    } else {
      setHasMore(false);
    }
  };

  const fetchTrending = useCallback(async (pageNum = 1, append = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);
    
    setError(null);
    if (!append) {
      setSearchQuery('');
      setActiveGenre(null);
    }
    
    try {
      const response = await apiClient.get(`/movies/trending?type=${mediaType}&page=${pageNum}`);
      if (append) {
        setMovies(prev => [...prev, ...(response.data || [])]);
      } else {
        setMovies(response.data || []);
      }
      handleMeta(response.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [mediaType]);

  // Fetch genres and trending on mount or when mediaType changes
  useEffect(() => {
    async function loadGenres() {
      try {
        const response = await apiClient.get(`/movies/genres?type=${mediaType}`);
        setGenres(response.data || []);
      } catch (err) {
        console.error('Failed to load genres:', err.message);
      }
    }
    loadGenres();
    fetchTrending();
  }, [mediaType, fetchTrending]);

  const searchMovies = useCallback(async (query, pageNum = 1, append = false) => {
    if (!query || query.trim().length === 0) {
      return fetchTrending(pageNum, append);
    }

    if (!append) setLoading(true);
    else setLoadingMore(true);
    
    setError(null);
    if (!append) {
      setSearchQuery(query);
      setActiveGenre(null);
    }
    
    try {
      const response = await apiClient.get(`/movies/search?query=${encodeURIComponent(query)}&type=${mediaType}&page=${pageNum}`);
      if (append) {
        setMovies(prev => [...prev, ...(response.data || [])]);
      } else {
        setMovies(response.data || []);
      }
      handleMeta(response.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [fetchTrending, mediaType]);

  const filterByGenre = useCallback(async (genreId, pageNum = 1, append = false) => {
    if (genreId === activeGenre && !append) {
      return fetchTrending();
    }

    if (!append) setLoading(true);
    else setLoadingMore(true);
    
    setError(null);
    if (!append) {
      setSearchQuery('');
      setActiveGenre(genreId);
    }
    
    try {
      const response = await apiClient.get(`/movies/genre/${genreId}?type=${mediaType}&page=${pageNum}`);
      if (append) {
        setMovies(prev => [...prev, ...(response.data || [])]);
      } else {
        setMovies(response.data || []);
      }
      handleMeta(response.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeGenre, fetchTrending, mediaType]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading || loadingMore) return;
    const nextPage = page + 1;
    if (searchQuery) {
      searchMovies(searchQuery, nextPage, true);
    } else if (activeGenre) {
      filterByGenre(activeGenre, nextPage, true);
    } else {
      fetchTrending(nextPage, true);
    }
  }, [hasMore, loading, loadingMore, page, searchQuery, activeGenre, searchMovies, filterByGenre, fetchTrending]);

  return {
    movies,
    genres,
    loading,
    loadingMore,
    error,
    searchMovies,
    fetchTrending,
    filterByGenre,
    activeGenre,
    searchQuery,
    mediaType,
    setMediaType,
    loadMore,
    hasMore,
  };
}
