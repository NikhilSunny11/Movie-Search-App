import { useState, useEffect } from 'react';
import { SITE_TITLE, SITE_TAGLINE, BACKDROP_SIZES } from '../../config/constants';
import './HeroSection.css';

export default function HeroSection({ trendingMovie, children }) {
  const [typedTagline, setTypedTagline] = useState('');
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < SITE_TAGLINE.length) {
        setTypedTagline(SITE_TAGLINE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Speed of typing

    return () => clearInterval(typingInterval);
  }, []);

  const backdropUrl = trendingMovie?.backdrop_path
    ? `${BACKDROP_SIZES.large}${trendingMovie.backdrop_path}`
    : null;

  return (
    <section className="hero" id="hero-section">
      {backdropUrl && (
        <div
          className="hero__backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
          aria-hidden="true"
        />
      )}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content container">
        <h1 className="hero__title">
          <span className="hero__title-accent">{SITE_TITLE}</span>
        </h1>
        <p className="hero__tagline">{typedTagline}<span className="hero__cursor">|</span></p>

        <div className="hero__search-wrapper">
          {children}
        </div>
      </div>
    </section>
  );
}
