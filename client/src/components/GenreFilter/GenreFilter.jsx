import './GenreFilter.css';

export default function GenreFilter({ genres, activeGenre, onGenreSelect, disabled = false }) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className={`genre-filter ${disabled ? 'genre-filter--disabled' : ''}`} id="genre-filter">
      {disabled && (
        <span className="genre-filter__hint">Clear search to filter by genre</span>
      )}
      <div className="genre-filter__scroll container">
        <button
          className={`genre-filter__chip ${activeGenre === null ? 'genre-filter__chip--active' : ''}`}
          onClick={() => !disabled && onGenreSelect(null)}
          disabled={disabled}
          id="genre-all"
        >
          🔥 Trending
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-filter__chip ${activeGenre === genre.id ? 'genre-filter__chip--active' : ''}`}
            onClick={() => !disabled && onGenreSelect(genre.id)}
            disabled={disabled}
            id={`genre-${genre.id}`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
