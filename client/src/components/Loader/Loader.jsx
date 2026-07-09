import './Loader.css';

export default function Loader({ count = 8 }) {
  return (
    <div className="loader container" id="skeleton-loader">
      <div className="loader__grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="loader__card" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="loader__poster shimmer" />
            <div className="loader__info">
              <div className="loader__title shimmer" />
              <div className="loader__year shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
