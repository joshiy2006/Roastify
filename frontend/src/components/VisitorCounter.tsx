import { useState } from 'react'

const STORAGE_KEY = 'roastify_visits'

function nextVisitCount() {
  try {
    const stored = Number(localStorage.getItem(STORAGE_KEY))
    const next = (Number.isFinite(stored) && stored > 0 ? stored : 133742) + 1
    localStorage.setItem(STORAGE_KEY, String(next))
    return next
  } catch {
    return 133742
  }
}

/** Kitsch retro "you are visitor #" odometer, seeded from localStorage so it climbs per return visit. */
export default function VisitorCounter() {
  const [count] = useState(nextVisitCount)

  const digits = String(count).padStart(7, '0').split('')

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-pixel text-[9px] text-white/60">YOU ARE ROASTER No.</span>
      <div className="flex gap-1 rounded-md border-2 border-acid bg-inkblack px-2 py-1 shadow-[0_0_12px_rgba(212,255,0,0.4)]">
        {digits.map((d, i) => (
          <span
            key={i}
            className="font-pixel flex h-6 w-4 items-center justify-center bg-black text-sm text-acid sm:h-7 sm:w-5"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
