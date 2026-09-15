import type { ReactNode } from 'react'

interface StickerBadgeProps {
  children: ReactNode
  color?: 'pink' | 'blue' | 'lime' | 'yellow'
  className?: string
}

const COLOR_MAP: Record<string, string> = {
  pink: 'bg-hotpink text-white',
  blue: 'bg-cyberblue text-inkblack',
  lime: 'bg-acid text-inkblack',
  yellow: 'bg-sunny text-inkblack',
}

/** Rotated circular sticker, like the "NEW!" badges plastered on Y2K CD-ROM box art. */
export default function StickerBadge({ children, color = 'pink', className = '' }: StickerBadgeProps) {
  return (
    <span
      className={`animate-wiggle font-pixel inline-flex -rotate-6 items-center justify-center rounded-full border-4 border-inkblack px-3 py-2 text-center text-[9px] leading-tight shadow-[3px_3px_0_#0b0715] sm:text-[10px] ${COLOR_MAP[color]} ${className}`}
    >
      {children}
    </span>
  )
}
