import { useState, useEffect } from 'react';

// Statuses: 'watching', 'plan_to_watch', 'completed', 'dropped'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const item = window.localStorage.getItem('cinesearch_watchlist');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return {};
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const item = window.localStorage.getItem('cinesearch_reviews');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem('cinesearch_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    window.localStorage.setItem('cinesearch_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const updateStatus = (mediaId, status, mediaData) => {
    setWatchlist(prev => {
      let next;
      if (!status) {
        next = { ...prev };
        delete next[mediaId];
      } else {
        next = {
          ...prev,
          [mediaId]: {
            status,
            updatedAt: Date.now(),
            media: mediaData // Cache title, poster, type for watchlist rendering
          }
        };
      }
      // Write to localStorage synchronously so the data is immediately
      // available when the Watchlist tab mounts (avoids useEffect race).
      window.localStorage.setItem('cinesearch_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const saveReview = (mediaId, rating, text) => {
    setReviews(prev => ({
      ...prev,
      [mediaId]: { rating, text, updatedAt: Date.now() }
    }));
  };

  const getStatus = (mediaId) => {
    return watchlist[mediaId]?.status || null;
  };

  const getReview = (mediaId) => {
    return reviews[mediaId] || null;
  };

  return {
    watchlist,
    reviews,
    updateStatus,
    saveReview,
    getStatus,
    getReview
  };
}
