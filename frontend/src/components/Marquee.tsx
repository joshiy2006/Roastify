interface MarqueeProps {
  text: string
  className?: string
}

/** Infinite-scrolling ticker banner, y2k-website-under-construction style. */
export default function Marquee({ text, className = '' }: MarqueeProps) {
  return (
    <div
      className={`scrollbar-none flex overflow-hidden border-y-4 border-inkblack bg-acid py-2 whitespace-nowrap ${className}`}
    >
      <div className="animate-marquee flex shrink-0">
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="font-pixel mx-4 flex items-center gap-4 text-[10px] tracking-widest text-inkblack sm:text-xs"
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <span key={j} className="mx-4">
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
