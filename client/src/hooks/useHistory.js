import { useState, useEffect } from 'react';

const HISTORY_KEY = 'cinesearch_history';

export function useHistory() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (movie) => {
    if (!movie || !movie.id) return;
    setHistory(prev => {
      // Remove if it already exists to move it to the top
      const filtered = prev.filter(m => m.id !== movie.id);
      return [movie, ...filtered].slice(0, 50); // Keep last 50
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
}
