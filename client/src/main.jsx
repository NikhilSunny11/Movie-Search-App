import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { injectThemeCSS } from './config/theme';
import App from './App';
import './styles/global.css';

// Inject theme CSS custom properties into :root
injectThemeCSS();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
