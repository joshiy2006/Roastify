export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="text-6xl">🫠</span>
      <h1 className="font-display text-holo text-2xl sm:text-4xl">NOTHING TO ROAST HERE</h1>
      <p className="font-body max-w-md text-white/70">That page doesn't exist. Not even we are that savage.</p>
      <a href="/" className="font-pixel text-xs text-acid underline underline-offset-4">
        ← back home
      </a>
    </div>
  )
}
