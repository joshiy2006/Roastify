import { forwardRef } from 'react'
import type { Platform, RoastResult } from '../data/mockRoast'

interface ShareCardProps {
  platform: Platform
  result: RoastResult
}

const GRADIENT: Record<Platform, string> = {
  spotify: 'from-bubblegum via-hotpink to-grape',
  steam: 'from-cyberblue via-grape to-hotpink',
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard({ platform, result }, ref) {
  return (
    <div
      ref={ref}
      className={`relative flex aspect-[4/5] w-full max-w-sm flex-col justify-between overflow-hidden rounded-[1.75rem] border-4 border-inkblack bg-gradient-to-br p-6 text-inkblack shadow-[8px_8px_0_#0b0715] ${GRADIENT[platform]}`}
    >
      <div className="bg-grid-y2k pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative flex items-center justify-between">
        <span className="font-pixel rounded-full border-2 border-inkblack bg-white/80 px-2 py-1 text-[8px]">
          {platform === 'spotify' ? '🎧 SPOTIFY' : '🎮 STEAM'}
        </span>
        <span className="font-pixel animate-wiggle rounded-full border-2 border-inkblack bg-sunny px-2 py-1 text-[8px]">
          {result.badge}
        </span>
      </div>

      <div className="relative flex flex-col gap-3">
        <p className="font-display text-lg leading-tight sm:text-xl">{result.headline}</p>
        <p className="font-body rounded-2xl border-4 border-inkblack bg-white/90 p-4 text-sm font-semibold leading-snug sm:text-base">
          “{result.roast}”
        </p>
      </div>

      <div className="relative flex items-end justify-between">
        <p className="font-body text-sm font-bold">@{result.handle}</p>
        <p className="font-pixel text-[8px] opacity-80">roastify.app</p>
      </div>
    </div>
  )
})

export default ShareCard
