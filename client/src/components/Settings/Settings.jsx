import { useHistory } from '../../hooks/useHistory';
import MovieCard from '../MovieCard/MovieCard';
import './Settings.css';

export default function Settings({ onMovieClick }) {
  const { history, clearHistory } = useHistory();

  const handleClearCache = () => {
    // Clear viewing history
    clearHistory();
    // Also clear any browser cache if we had a specific service worker or local storage for API
    // For now, reload the window to ensure a clean state without bugs
    window.location.reload();
  };

  return (
    <div className="settings-page container">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your application preferences and data.</p>
      </div>

      <div className="settings-card glass">
        <div className="settings-card-header">
          <div>
            <h3>Clear Cache & History</h3>
            <p className="settings-card-desc">This will erase your viewing history and reload the app to clear memory caches. Your Watchlist and Profile will remain intact.</p>
          </div>
          <button onClick={handleClearCache} className="btn btn-danger">
            Clear Cache
          </button>
        </div>
      </div>

      <div className="settings-history">
        <div className="settings-history-header">
          <h3>Viewing History</h3>
          <span className="history-count">{history.length} items</span>
        </div>
        
        {history.length === 0 ? (
          <div className="history-empty glass">
            <p>You haven't viewed any movies yet.</p>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                onClick={onMovieClick}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
