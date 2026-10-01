import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Explicit IPv4 loopback — without this, "localhost" can resolve to ::1
    // only on some systems, so a browser request to the literal 127.0.0.1
    // (required for Spotify OAuth cookies to work, see backend/README.md)
    // gets ECONNREFUSED even though `npm run dev` looks like it's running.
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
})
