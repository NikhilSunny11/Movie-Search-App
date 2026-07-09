import { useState } from 'react';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useProfile } from '../../hooks/useProfile';
import MovieGrid from '../MovieGrid/MovieGrid';
import './Watchlist.css';

export default function Watchlist({ onMovieClick }) {
  const { watchlist } = useWatchlist();
  const { customLists } = useProfile();
  const [filter, setFilter] = useState('all'); // 'all', 'watching', 'plan_to_watch', 'completed', ...customLists

  const items = Object.entries(watchlist).map(([id, data]) => ({
    ...data.media,
    id: parseInt(id, 10),
    status: data.status,
    updatedAt: data.updatedAt,
  })).sort((a, b) => b.updatedAt - a.updatedAt);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(i => i.status === filter);

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h2>My Watchlist</h2>
        <div className="watchlist-filters" style={{ flexWrap: 'wrap' }}>
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >All ({items.length})</button>
          <button 
            className={filter === 'watching' ? 'active' : ''} 
            onClick={() => setFilter('watching')}
          >Watching</button>
          <button 
            className={filter === 'plan_to_watch' ? 'active' : ''} 
            onClick={() => setFilter('plan_to_watch')}
          >Plan to Watch</button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >Completed</button>
          {customLists.map(listName => (
            <button 
              key={listName}
              className={filter === listName ? 'active' : ''} 
              onClick={() => setFilter(listName)}
            >{listName}</button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="watchlist-empty">
          <p>No items found in this category.</p>
        </div>
      ) : (
        <MovieGrid 
          movies={filteredItems} 
          onMovieClick={onMovieClick} 
          title="" 
        />
      )}
    </div>
  );
}
