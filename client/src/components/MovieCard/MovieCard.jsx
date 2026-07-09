import { POSTER_SIZES, POSTER_PLACEHOLDER } from '../../config/constants';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useProfile } from '../../hooks/useProfile';
import './MovieCard.css';

export default function MovieCard({ movie, onClick, index = 0, viewMode = 'grid' }) {
  const { getStatus, updateStatus } = useWatchlist();
  const { customLists } = useProfile();
  
  const posterUrl = movie.poster_path
    ? `${POSTER_SIZES.medium}${movie.poster_path}`
    : POSTER_PLACEHOLDER;

  const year = movie.release_date || movie.first_air_date
    ? new Date(movie.release_date || movie.first_air_date).getFullYear()
    : 'N/A';

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : '—';

  const title = movie.title || movie.name; // Handles TV shows (name) and Movies (title)
  const currentStatus = getStatus(movie.id);

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateStatus(movie.id, newStatus, movie);
  };

  return (
    <article
      className={`movie-card ${viewMode}`}
      onClick={() => onClick(movie.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(movie.id)}
      style={{ animationDelay: `${index * 50}ms` }}
      id={`movie-card-${movie.id}`}
      aria-label={`${title} (${year})`}
    >
      <div className="movie-card__poster-wrapper">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="movie-card__poster"
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <span className="movie-card__rating">
            <span className="movie-card__star" aria-hidden="true">★</span>
            {rating}
          </span>
          {currentStatus && (
            <span className={`movie-card__status-badge ${currentStatus.replace(/\s+/g, '-').toLowerCase()}`}>
              {currentStatus.replace(/_/g, ' ')}
            </span>
          )}
        </div>
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{title}</h3>
        <span className="movie-card__year">{year}</span>
        
        {viewMode === 'list' && (
          <p className="movie-card__overview">{movie.overview}</p>
        )}

        <div className="movie-card__actions" onClick={e => e.stopPropagation()}>
          <select 
            value={currentStatus || ''} 
            onChange={(e) => handleStatusChange(e, e.target.value)}
            className="movie-card__status-select"
          >
            <option value="">+ Add to List</option>
            <option value="watching">Watching</option>
            <option value="plan_to_watch">Plan to Watch</option>
            <option value="completed">Completed</option>
            {customLists.map(listName => (
              <option key={listName} value={listName}>{listName}</option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
}
