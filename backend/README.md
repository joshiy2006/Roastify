# Roastify API

FastAPI backend for the Spotify/Steam roaster.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

Health check: `GET http://localhost:8000/health`

## Endpoints

- `GET /roast/steam?handle=...` — roast for a Steam ID/vanity URL (stubbed until Steam Web API integration lands)
- `GET /roast/spotify?handle=...` — roast for a Spotify account (stubbed until OAuth + stats fetching lands)
- `GET /auth/spotify/login` — redirects to Spotify's OAuth consent screen (needs `SPOTIFY_CLIENT_ID` set)
- `GET /auth/spotify/callback` — OAuth callback (not implemented yet)

Both roast endpoints currently return a fixed placeholder shaped like the real response so the frontend
can be wired up ahead of the Steam/Spotify/Groq integrations.
