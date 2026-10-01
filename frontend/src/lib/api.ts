// Must use the same host as the backend's SPOTIFY_REDIRECT_URI (127.0.0.1,
// not localhost) — the OAuth callback's session cookies are host-scoped, so
// a mismatch here means /roast/spotify always comes back unauthenticated.
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://127.0.0.1:8000'
