import { useState, useEffect } from 'react';
import { useMovies } from './hooks/useMovies';
import { useDebounce } from './hooks/useDebounce';
import { SEARCH_DEBOUNCE_MS } from './config/constants';
import Sidebar from './components/Sidebar/Sidebar';
import HeroSection from './components/HeroSection/HeroSection';
import SearchBar from './components/SearchBar/SearchBar';
import GenreFilter from './components/GenreFilter/GenreFilter';
import MovieGrid from './components/MovieGrid/MovieGrid';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Watchlist from './components/Watchlist/Watchlist';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import FloatingIcons from './components/FloatingIcons/FloatingIcons';
import './App.css';

export default function App() {
  const {
    movies,
    genres,
    loading,
    loadingMore,
    error,
    searchMovies,
    fetchTrending,
    filterByGenre,
    activeGenre,
    searchQuery,
    mediaType,
    setMediaType,
    loadMore,
    hasMore,
  } = useMovies();

  const [activeTab, setActiveTab] = useState('movie'); // 'movie', 'tv', 'watchlist'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState('movie'); // Track which type the details modal is opening for
  const [rawSearch, setRawSearch] = useState('');

  // Debounce search input
  const debouncedSearch = useDebounce(rawSearch, SEARCH_DEBOUNCE_MS);

  // Trigger search when debounced value changes (useEffect, not useState)
  useEffect(() => {
    searchMovies(debouncedSearch);
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(value) {
    // Only update state — the useEffect above handles the API call via debounce
    setRawSearch(value);
  }

  function handleTabChange(tab, resetHome = false) {
    setActiveTab(tab);
    if (resetHome) {
      setRawSearch('');
      setMediaType('movie');
      searchMovies(''); // Clears search and resets to trending
    } else if (tab === 'movie' || tab === 'tv') {
      setRawSearch('');
      setMediaType(tab);
      // Don't call searchMovies/fetchTrending here — the useMovies useEffect
      // already reacts to mediaType changes and will re-fetch with the new type.
    } else {
      // Non-content tabs (watchlist, profile, settings): just clear search
      setRawSearch('');
    }
  }

  function handleMovieClick(id, type) {
    setSelectedMovieId(id);
    setSelectedMediaType(type || (activeTab === 'watchlist' ? 'movie' : activeTab));
  }

  // Determine section title
  let sectionTitle = '🔥 Trending This Week';
  if (searchQuery) {
    sectionTitle = `Results for "${searchQuery}"`;
  } else if (activeGenre) {
    const genreName = genres.find((g) => g.id === activeGenre)?.name || '';
    sectionTitle = `${genreName} ${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`;
  }

  return (
    <div className={`app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} id="app-root">
      <FloatingIcons />
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main>
        {activeTab !== 'watchlist' && activeTab !== 'profile' && activeTab !== 'settings' && (
          <>
            <HeroSection trendingMovie={movies[0]}>
              <SearchBar onSearch={handleSearch} initialValue={rawSearch} />
            </HeroSection>

            <GenreFilter
              genres={genres}
              activeGenre={activeGenre}
              disabled={!!searchQuery}
              onGenreSelect={(id) => {
                setRawSearch('');
                if (id === null) {
                  fetchTrending();
                } else {
                  filterByGenre(id);
                }
              }}
            />

            {error && (
              <div className="app__error container" id="error-message">
                <p>⚠️ {error}</p>
              </div>
            )}

            {loading ? (
              <Loader count={8} />
            ) : (
              <MovieGrid
                movies={movies}
                onMovieClick={handleMovieClick}
                title={sectionTitle}
                loadMore={loadMore}
                hasMore={hasMore}
                loadingMore={loadingMore}
              />
            )}
          </>
        )}

        {activeTab === 'watchlist' && (
          <div className="container">
            <Watchlist onMovieClick={handleMovieClick} />
          </div>
        )}

        {activeTab === 'profile' && (
          <Profile />
        )}

        {activeTab === 'settings' && (
          <Settings onMovieClick={handleMovieClick} />
        )}
      </main>

      {/* We keep the footer, but typically sidebars remove the need for it. Let's leave it in the main flow. */}

      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          mediaType={selectedMediaType}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}
