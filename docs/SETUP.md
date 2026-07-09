# Setup Guide

Complete guide to get the Movie Search App running on a new machine.

## Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (bundled with Node.js)
- **TMDB API Key** → [Get one free](https://www.themoviedb.org/settings/api)
- **Git** → [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
```

## Step 2: Install Dependencies

**Option A** — One-command setup:
```bash
node scripts/setup.js
```

**Option B** — Manual install:
```bash
cd client && npm install
cd ../server && npm install
```

## Step 3: Configure Environment Variables

```bash
# Copy the template
cp server/.env.example server/.env
```

Open `server/.env` and replace the placeholder:
```
TMDB_API_KEY=your_actual_api_key_here
```

## Step 4: Start Development Servers

Open **two terminal windows**:

```bash
# Terminal 1 — Backend API (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend UI (port 5173)
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

## Step 5: Run Tests

```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

## Production Build

```bash
# Build the frontend for production
cd client && npm run build

# The output is in client/dist/
# Deploy this to any static hosting (Vercel, Netlify, etc.)
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel Dashboard](https://vercel.com/new)
3. Set the **Root Directory** to `client/`
4. Add environment variables in Vercel Settings:
   - `VITE_API_BASE_URL` = your deployed backend URL
5. For the backend, deploy separately using Vercel Serverless Functions or Railway

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Missing required environment variable: TMDB_API_KEY` | Copy `.env.example` to `.env` and add your key |
| CORS errors in browser | Check `CORS_ORIGIN` in `server/.env` matches your frontend URL |
| Port already in use | Change `PORT` in `server/.env` or kill the process on that port |
| No movie posters showing | Verify your TMDB API key is valid at [tmdb.org](https://www.themoviedb.org/) |
