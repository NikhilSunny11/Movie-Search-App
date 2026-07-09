import './FloatingIcons.css';

const ICONS = [
  // TV Icon
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
      <polyline points="17 2 12 7 7 2"></polyline>
    </svg>
  ),
  // Video / Film Icon
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
      <line x1="7" y1="2" x2="7" y2="22"></line>
      <line x1="17" y1="2" x2="17" y2="22"></line>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="2" y1="7" x2="7" y2="7"></line>
      <line x1="2" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="22" y2="17"></line>
      <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
  ),
  // VLC / Cone Icon
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 20h18L12 2z"></path>
      <path d="M5.5 14h13"></path>
      <path d="M8.5 8h7"></path>
    </svg>
  ),
  // Play Circle
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
  )
];

export default function FloatingIcons() {
  // Generate a random set of floating items
  // We use fixed math so it doesn't cause hydration errors (if SSR), but we're in CRA/Vite so it's fine.
  const items = Array.from({ length: 15 }).map((_, i) => {
    const icon = ICONS[i % ICONS.length];
    const size = Math.random() * 40 + 30; // 30px to 70px
    const left = Math.random() * 100; // 0 to 100vw
    const duration = Math.random() * 20 + 15; // 15s to 35s
    const delay = Math.random() * -20; // negative delay so they start immediately
    const rotation = Math.random() * 360;

    return (
      <div 
        key={i} 
        className="floating-icon"
        style={{
          '--size': `${size}px`,
          '--left': `${left}vw`,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
          '--rotation': `${rotation}deg`
        }}
      >
        {icon}
      </div>
    );
  });

  return (
    <div className="floating-icons-container" aria-hidden="true">
      {items}
    </div>
  );
}
