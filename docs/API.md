# API Reference

All endpoints return a standardized JSON envelope:

```json
{
  "success": true,
  "data": "...",
  "error": null,
  "meta": { "page": 1, "totalPages": 10, "totalResults": 200 }
}
```

Base URL: `http://localhost:5000/api`

---

## Health Check

### `GET /api/health`

Returns server status.

**Response:**
```json
{
  "success": true,
  "data": { "status": "ok", "timestamp": "2026-01-01T00:00:00.000Z" }
}
```

---

## Movie Routes

### `GET /api/movies/search`

Search for movies by title.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search term |
| `page` | number | ❌ | Page number (default: 1) |

**Example:** `GET /api/movies/search?query=inception&page=1`

---

### `GET /api/movies/trending`

Get weekly trending movies.

**Example:** `GET /api/movies/trending`

---

### `GET /api/movies/genres`

Get the list of TMDB movie genres.

**Response Data:**
```json
[
  { "id": 28, "name": "Action" },
  { "id": 35, "name": "Comedy" }
]
```

---

### `GET /api/movies/genre/:genreId`

Discover movies by genre.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `genreId` | number | ✅ | TMDB genre ID (in URL path) |
| `page` | number | ❌ | Page number (default: 1) |

**Example:** `GET /api/movies/genre/28?page=1`

---

### `GET /api/movies/:id`

Get full details for a single movie (includes credits and videos).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | ✅ | TMDB movie ID (in URL path) |

**Example:** `GET /api/movies/550`

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Bad request (missing/invalid parameters) |
| 404 | Movie not found |
| 429 | Rate limit exceeded (100 req/15min) |
| 500 | Internal server error |

```json
{
  "success": false,
  "data": null,
  "error": "Query parameter is required.",
  "meta": null
}
```
