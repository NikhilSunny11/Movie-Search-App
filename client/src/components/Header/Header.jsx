import { useState } from 'react';
import { SITE_TITLE } from '../../config/constants';
import './Header.css';

export default function Header({ onLogoClick }) {
  const [scrolled, setScrolled] = useState(false);

  // Add glass effect on scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50);
    }, { passive: true });
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="site-header">
      <div className="header__inner container">
        <button className="header__logo" onClick={onLogoClick} aria-label="Go to home">
          <span className="header__logo-icon">🎬</span>
          <span className="header__logo-text">{SITE_TITLE}</span>
        </button>

        <nav className="header__nav" aria-label="Main navigation">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="header__link"
          >
            Powered by TMDB
          </a>
        </nav>
      </div>
    </header>
  );
}
