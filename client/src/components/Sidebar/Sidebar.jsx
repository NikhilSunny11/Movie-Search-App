import './Sidebar.css';
import { SITE_TITLE } from '../../config/constants';

export default function Sidebar({ activeTab, onTabChange, isOpen, onToggle }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo" onClick={() => onTabChange('movie', true)}>
          <img src="/brand/logo.svg" alt="Logo" />
          {isOpen && <h1>{SITE_TITLE}</h1>}
        </div>
        <button className="sidebar__toggle" onClick={onToggle} title="Toggle Sidebar">
          {isOpen ? '◀' : '▶'}
        </button>
      </div>


      <nav className="sidebar__nav">
        <button 
          className={`sidebar__link ${activeTab === 'movie' ? 'active' : ''}`}
          onClick={() => onTabChange('movie')}
          title="Movies"
        >
          <span className="sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
          </span>
          {isOpen && <span className="sidebar__text">Movies</span>}
        </button>
        <button 
          className={`sidebar__link ${activeTab === 'tv' ? 'active' : ''}`}
          onClick={() => onTabChange('tv')}
          title="TV Shows"
        >
          <span className="sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <polyline points="17 2 12 7 7 2"></polyline>
            </svg>
          </span>
          {isOpen && <span className="sidebar__text">TV Shows</span>}
        </button>
        <button 
          className={`sidebar__link ${activeTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => onTabChange('watchlist')}
          title="My Watchlist"
        >
          <span className="sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          {isOpen && <span className="sidebar__text">My Watchlist</span>}
        </button>
        <div className="sidebar__divider" style={{height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0'}}></div>
        <button 
          className={`sidebar__link ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => onTabChange('profile')}
          title="Profile"
        >
          <span className="sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          {isOpen && <span className="sidebar__text">Profile</span>}
        </button>
        <button 
          className={`sidebar__link ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => onTabChange('settings')}
          title="Settings"
        >
          <span className="sidebar__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </span>
          {isOpen && <span className="sidebar__text">Settings</span>}
        </button>
      </nav>


    </aside>
  );
}
