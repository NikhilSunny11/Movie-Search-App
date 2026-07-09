import { SITE_TITLE } from '../../config/constants';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="site-footer">
      <div className="footer__inner container">
        <p className="footer__copyright">
          © {currentYear} {SITE_TITLE}. Built with ❤️
        </p>
        <p className="footer__attribution">
          Movie data provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TMDB
          </a>
        </p>
      </div>
    </footer>
  );
}
