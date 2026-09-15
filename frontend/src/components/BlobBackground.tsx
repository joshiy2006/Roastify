/** Ambient floating gradient blobs + grid overlay used behind page content for the y2k backdrop. */
export default function BlobBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-inkblack">
      <div className="absolute inset-0 bg-gradient-to-br from-deepspace via-inkblack to-deepspace-2" />
      <div className="bg-grid-y2k absolute inset-0 opacity-40" />

      <div className="animate-blob animate-float-slow absolute -left-20 -top-24 h-80 w-80 bg-hotpink/40 blur-3xl" />
      <div className="animate-blob animate-float-slower absolute right-[-6rem] top-10 h-96 w-96 bg-cyberblue/30 blur-3xl [animation-delay:1.5s]" />
      <div className="animate-blob animate-float-slow absolute bottom-[-8rem] left-1/4 h-96 w-96 bg-grape/35 blur-3xl [animation-delay:0.7s]" />
      <div className="animate-blob animate-float-slower absolute bottom-10 right-1/4 h-72 w-72 bg-acid/20 blur-3xl [animation-delay:2.2s]" />

      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />
    </div>
  )
}
