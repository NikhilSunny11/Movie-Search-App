import { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

export default function MovieGrid({ movies, onMovieClick, title, loadMore, hasMore, loadingMore }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid__empty container" id="movie-grid-empty">
        <div className="movie-grid__empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
          </svg>
        </div>
        <p className="movie-grid__empty-text">No movies found</p>
        <p className="movie-grid__empty-hint">Try a different search or genre</p>
      </div>
    );
  }

  return (
    <section className="movie-grid" id="movie-grid">
      <div className="container">
        <div className="movie-grid__header">
          {title && <h2 className="movie-grid__title">{title}</h2>}
          <div className="movie-grid__view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''} 
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''} 
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className={`movie-grid__container ${viewMode}`}>
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>
        {hasMore && (
          <div className="movie-grid__load-more">
            <button 
              className={`load-more-btn ${loadingMore ? 'loading' : ''}`}
              onClick={loadMore} 
              disabled={loadingMore}
            >
              <span className="load-more-btn__text">
                {loadingMore ? 'Loading More...' : 'Discover More'}
              </span>
              {!loadingMore && (
                <svg className="load-more-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
