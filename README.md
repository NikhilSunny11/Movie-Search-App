# 🎬 Movie Search App

A premium, commercial-grade movie search application built with React and Node.js. Powered by the TMDB API.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

---

## ✨ Features

- **Instant Search** — Debounced search with real-time results
- **Trending Movies** — See what's popular right now
- **Genre Filtering** — Filter by action, comedy, drama, and more
- **Movie Details** — Full cast, ratings, overviews, and trailers
- **White-Label Ready** — Change brand colors, logo, and fonts in one config file
- **Professional Backend** — Winston logging, rate limiting, structured error handling
- **Fully Tested** — Frontend (Vitest) and backend (Supertest) test suites

---

## 🚀 Quick Start (Zero to Running)

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A free [TMDB API Key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/username/movie-search-app.git
cd movie-search-app
```

### 2. Install all dependencies

```bash
node scripts/setup.js
```

This installs dependencies for both `client/` and `server/`.

### 3. Configure environment variables

```bash
# Copy the template
cp server/.env.example server/.env

# Open server/.env and paste your TMDB API key
```

### 4. Start the development servers

Open **two terminals**:

```bash
# Terminal 1 — Backend (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

---

## 📁 Project Structure

```text
movie-search-app/
├── .github/workflows/      # CI/CD (GitHub Actions → Vercel)
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── api/             # API client
│   │   ├── components/      # UI components (Header, MovieCard, etc.)
│   │   ├── config/          # Theme & constants (white-label config)
│   │   ├── hooks/           # Custom React hooks
│   │   └── styles/          # Global CSS
│   └── tests/               # Frontend tests
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # Environment validation
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/       # CORS, rate limiting, error handling
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # TMDB API integration
│   │   └── utils/           # Logger, response formatter
│   └── tests/               # Backend tests
├── docs/                    # Architecture, API docs, setup & branding guides
└── scripts/                 # One-command project setup
```

---

## 🎨 Customization (White-Labeling)

All branding is centralized in two files:

| What to change | File |
|---|---|
| Colors, fonts, spacing | `client/src/config/theme.js` |
| Site title, language, defaults | `client/src/config/constants.js` |
| Logo & favicon | `client/public/brand/` |

See [docs/BRANDING.md](docs/BRANDING.md) for a full guide.

---

## 🧪 Running Tests

```bash
# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test
```

---

## 🚢 Deployment

This project is configured for **Vercel** deployment via GitHub Actions.

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set environment variables in Vercel dashboard
3. Push to `main` — CI runs tests, then auto-deploys

See [docs/SETUP.md](docs/SETUP.md) for detailed deployment instructions.

---

## 📄 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Setup Guide](docs/SETUP.md)
- [Branding Guide](docs/BRANDING.md)

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB.
