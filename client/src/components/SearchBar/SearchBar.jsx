import { useState, useRef } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  }

  function handleClear() {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  }

  return (
    <div className="search-bar glass" id="search-bar">
      <div className="search-bar__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder="Search for movies..."
        value={value}
        onChange={handleChange}
        aria-label="Search for movies"
        id="search-input"
        autoComplete="off"
      />

      {value.length > 0 && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
          id="search-clear-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      )}
    </div>
  );
}
