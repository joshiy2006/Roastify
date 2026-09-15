import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Marquee from '../components/Marquee'
import ShareCard from '../components/ShareCard'
import { generateRoast, type Platform, type RoastResult } from '../data/mockRoast'

interface ResultsState {
  platform: Platform
  result: RoastResult
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultsState | null
  const [result, setResult] = useState(state?.result)
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!state || !result) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
        <p className="font-body text-white/70">No roast found. Go get judged first.</p>
        <a href="/" className="font-pixel text-xs text-acid underline underline-offset-4">
          ← back home
        </a>
      </div>
    )
  }

  const { platform } = state

  function handleRoastAgain() {
    if (!result) return
    setResult(generateRoast(platform, result.handle))
  }

  async function handleDownload() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `roastify-${platform}-${result?.handle ?? 'card'}.png`
      link.href = dataUrl
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  const maxPercent = Math.max(...result.stats.map((s) => s.percent))

  return (
    <div className="relative flex min-h-svh flex-col">
      <Marquee text="⚡ THE VERDICT IS IN ⚡ SCREENSHOT THIS ⚡" />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-10 px-4 py-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-pixel animate-wiggle rounded-full border-4 border-inkblack bg-sunny px-3 py-1 text-[10px] text-inkblack">
            {result.badge}
          </span>
          <h1 className="font-display text-chrome text-3xl leading-tight sm:text-5xl">{result.headline}</h1>
          <p className="font-body text-white/60">@{result.handle}</p>
        </div>

        <motion.blockquote
          key={result.roast}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="font-body relative max-w-2xl rounded-3xl border-4 border-inkblack bg-white/95 p-6 text-center text-lg font-semibold text-inkblack shadow-[8px_8px_0_#0b0715] sm:text-xl"
        >
          “{result.roast}”
        </motion.blockquote>

        <div className="grid w-full gap-10 md:grid-cols-2">
          <section className="flex flex-col gap-3">
            <h2 className="font-pixel text-xs text-acid">
              {platform === 'spotify' ? 'TOP ARTISTS' : 'TOP GAMES BY HOURS'}
            </h2>
            {result.stats.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-body font-semibold text-white/90">{row.label}</span>
                  <span className="font-pixel text-[10px] text-white/60">{row.value}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full border-2 border-inkblack/60 bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.percent / maxPercent) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-hotpink via-grape to-cyberblue"
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="flex flex-col items-center gap-4">
            <h2 className="font-pixel self-start text-xs text-acid">SHARE CARD</h2>
            <ShareCard ref={cardRef} platform={platform} result={result} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={downloading}
              className="font-display w-full max-w-sm rounded-2xl border-4 border-inkblack bg-acid px-6 py-3 text-inkblack shadow-[6px_6px_0_#0b0715] disabled:opacity-50"
            >
              {downloading ? 'SAVING...' : '⬇ DOWNLOAD SHARE CARD'}
            </motion.button>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRoastAgain}
            className="font-display rounded-2xl border-4 border-inkblack bg-gradient-to-br from-hotpink to-grape px-6 py-3 text-inkblack shadow-[6px_6px_0_#0b0715]"
          >
            🔥 ROAST AGAIN
          </motion.button>
          <button
            onClick={() => navigate('/')}
            className="font-pixel text-xs text-acid underline underline-offset-4"
          >
            ← try another platform
          </button>
        </div>
      </main>

      <Marquee text="⚡ SHARE YOUR ROAST ⚡ TAG A FRIEND WHO NEEDS HUMBLING ⚡" />
    </div>
  )
}
