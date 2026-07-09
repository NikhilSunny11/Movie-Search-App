import { useState, useEffect } from 'react';
import apiClient from '../../api/tmdbClient';
import { POSTER_SIZES, BACKDROP_SIZES, POSTER_PLACEHOLDER } from '../../config/constants';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useHistory } from '../../hooks/useHistory';
import { useProfile } from '../../hooks/useProfile';
import './MovieDetails.css';

export default function MovieDetails({ movieId, mediaType = 'movie', onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getStatus, updateStatus, getReview, saveReview } = useWatchlist();
  const { addToHistory } = useHistory();
  const { customLists } = useProfile();
  
  const [localReviewText, setLocalReviewText] = useState('');
  const [localRating, setLocalRating] = useState(0);
  const [isEditingReview, setIsEditingReview] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchDetails() {
      setLoading(true);
      try {
        const response = await apiClient.get(`/movies/${movieId}?type=${mediaType}`);
        setMovie(response.data);
        addToHistory(response.data);
      } catch (err) {
        console.error('Failed to load movie details:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId, mediaType]);

  useEffect(() => {
    if (movieId) {
      const existingReview = getReview(movieId);
      if (existingReview) {
        setLocalReviewText(existingReview.text || '');
        setLocalRating(existingReview.rating || 0);
      }
    }
  }, [movieId]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movieId) return null;

  const posterUrl = movie?.poster_path
    ? `${POSTER_SIZES.large}${movie.poster_path}`
    : POSTER_PLACEHOLDER;

  const backdropUrl = movie?.backdrop_path
    ? `${BACKDROP_SIZES.large}${movie.backdrop_path}`
    : null;

  const year = movie?.release_date || movie?.first_air_date
    ? new Date(movie.release_date || movie.first_air_date).getFullYear()
    : 'N/A';

  const title = movie?.title || movie?.name;
  const currentStatus = getStatus(movieId);
  const cast = movie?.credits?.cast?.slice(0, 8) || [];
  const trailer = movie?.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const tmdbReviews = movie?.reviews?.results || [];

  const handleSaveReview = () => {
    saveReview(movieId, localRating, localReviewText);
    setIsEditingReview(false);
  };

  return (
    <div className="movie-details__backdrop" onClick={onClose} id="movie-details-modal">
      <div className="movie-details__modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="movie-details__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {loading ? (
          <div className="movie-details__loading">
            <div className="movie-details__spinner" />
          </div>
        ) : movie ? (
          <>
            {backdropUrl && (
              <div className="movie-details__hero">
                <img src={backdropUrl} alt="" className="movie-details__hero-img" />
                <div className="movie-details__hero-gradient" />
              </div>
            )}

            <div className="movie-details__content">
              <div className="movie-details__layout">
                <div className="movie-details__poster-col">
                  <img src={posterUrl} alt={`${title} poster`} className="movie-details__poster" />
                  
                  {/* Watchlist Actions */}
                  <div className="movie-details__actions">
                    <select 
                      value={currentStatus || ''} 
                      onChange={(e) => updateStatus(movieId, e.target.value, movie)}
                      className="movie-details__status-select"
                    >
                      <option value="">+ Add to Watchlist</option>
                      <option value="watching">Watching</option>
                      <option value="plan_to_watch">Plan to Watch</option>
                      <option value="completed">Completed</option>
                      {customLists.map(listName => (
                        <option key={listName} value={listName}>{listName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="movie-details__info-col">
                  <h2 className="movie-details__title">{title}</h2>
                  <div className="movie-details__meta">
                    <span className="movie-details__rating">★ {movie.vote_average?.toFixed(1)}</span>
                    <span className="movie-details__dot">•</span>
                    <span>{year}</span>
                  </div>

                  {movie.genres && (
                    <div className="movie-details__genres">
                      {movie.genres.map((g) => (
                        <span key={g.id} className="movie-details__genre-tag">{g.name}</span>
                      ))}
                    </div>
                  )}

                  {movie.overview && (
                    <div className="movie-details__section">
                      <h3 className="movie-details__section-title">Overview</h3>
                      <p className="movie-details__overview">{movie.overview}</p>
                    </div>
                  )}
                </div>
              </div>

              {trailer && (
                <div className="movie-details__section">
                  <h3 className="movie-details__section-title">Trailer</h3>
                  <div className="movie-details__trailer-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {cast.length > 0 && (
                <div className="movie-details__section">
                  <h3 className="movie-details__section-title">Cast</h3>
                  <div className="movie-details__cast">
                    {cast.map((person) => (
                      <div key={person.id} className="movie-details__cast-member">
                        {person.profile_path ? (
                          <img src={`${POSTER_SIZES.small}${person.profile_path}`} alt={person.name} className="movie-details__cast-photo" />
                        ) : (
                          <div className="movie-details__cast-placeholder">{person.name.charAt(0)}</div>
                        )}
                        <span className="movie-details__cast-name">{person.name}</span>
                        <span className="movie-details__cast-char">{person.character}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* User Review Section */}
              <div className="movie-details__section">
                <h3 className="movie-details__section-title">My Review (Local)</h3>
                <div className="movie-details__my-review">
                  {getReview(movieId)?.text && !isEditingReview ? (
                    <div className="movie-details__review-card my-saved-review">
                      <div className="movie-details__review-header">
                        <strong>My Review</strong>
                        <span>★ {getReview(movieId).rating}</span>
                      </div>
                      <p className="movie-details__review-content">{getReview(movieId).text}</p>
                      <button onClick={() => setIsEditingReview(true)} className="movie-details__edit-btn" style={{marginTop: '1rem', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer'}}>Edit Review</button>
                    </div>
                  ) : (
                    <>
                      <select 
                        value={localRating} 
                        onChange={e => setLocalRating(Number(e.target.value))}
                        className="movie-details__rating-select"
                      >
                        <option value="0">No Rating</option>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                      <textarea 
                        value={localReviewText}
                        onChange={e => setLocalReviewText(e.target.value)}
                        placeholder="Write your thoughts..."
                        className="movie-details__review-input"
                      />
                      <button onClick={handleSaveReview} className="movie-details__save-btn">Save Review</button>
                      {getReview(movieId)?.text && (
                        <button onClick={() => setIsEditingReview(false)} style={{marginLeft: '1rem', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer'}}>Cancel</button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* TMDB Reviews */}
              {tmdbReviews.length > 0 && (
                <div className="movie-details__section">
                  <h3 className="movie-details__section-title">Community Reviews</h3>
                  <div className="movie-details__reviews">
                    {tmdbReviews.slice(0, 3).map(review => (
                      <div key={review.id} className="movie-details__review-card">
                        <div className="movie-details__review-header">
                          <strong>{review.author}</strong>
                          {review.author_details?.rating && <span>★ {review.author_details.rating}</span>}
                        </div>
                        <p className="movie-details__review-content">{review.content.slice(0, 300)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="movie-details__error">Failed to load details.</div>
        )}
      </div>
    </div>
  );
}
