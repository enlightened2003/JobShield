# JobShield — Frontend

A React + Vite + Tailwind frontend for the JobShield FastAPI backend (AI-powered job scam detector).

## What's here

- **Landing page** — pitch + live demo of the risk gauge
- **Auth** — register / login (JWT stored client-side, attached to every request)
- **Dashboard** — total/high/medium/low risk stats, a breakdown chart, and your 5 most recent scans
- **Scan a posting** — paste a job description, or upload a screenshot (OCR handled by the backend)
- **History** — paginated list of every past scan, with a detail view and delete
- Dark "security scanner" visual style, with a signature radial risk-gauge component that sweeps in on each result

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend if it's not on localhost:8000
npm run dev
```

The app runs at `http://localhost:5173` by default — this already matches the CORS origins allowed
in the backend's `app/main.py`. If you deploy the frontend elsewhere (e.g. Vercel), add that origin
to the backend's `origins` list.

## Backend contract this frontend expects

| Method | Path                  | Auth | Notes |
|--------|-----------------------|------|-------|
| POST   | `/auth/register`      | –    | `{ username, email, password }` |
| POST   | `/auth/login`         | –    | form-encoded `username` (email) + `password`, returns `{ access_token, token_type }` |
| GET    | `/auth/me`             | ✓    | current user |
| POST   | `/jobs/analyze`        | ✓    | `{ job_description }` |
| POST   | `/jobs/analyze-image`  | ✓    | multipart `file` |
| GET    | `/jobs/history?page=&limit=` | ✓ | paginated list |
| GET    | `/jobs/stats`          | ✓    | risk-level counts |
| GET    | `/jobs/{id}`           | ✓    | one analysis |
| DELETE | `/jobs/{id}`           | ✓    | delete one analysis |

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Notes for showing this to recruiters

- The JWT is stored in `localStorage` for simplicity — fine for a portfolio demo, but call this out
  (or swap to an httpOnly cookie) if you talk through security tradeoffs in an interview.
- `src/lib/api.js` is the single place that knows about the backend's shape — swap `VITE_API_URL` and
  everything else keeps working.
