import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Marquee from '../components/Marquee'
import type { Platform } from '../data/mockRoast'

const COPY: Record<Platform, { emoji: string; title: string; placeholder: string; hint: string; gradient: string }> = {
  spotify: {
    emoji: '🎧',
    title: 'ROAST MY SPOTIFY',
    placeholder: 'your Spotify display name',
    hint: 'e.g. "xoxo_sadgirl2007"',
    gradient: 'from-bubblegum to-hotpink',
  },
  steam: {
    emoji: '🎮',
    title: 'ROAST MY STEAM',
    placeholder: 'your SteamID or vanity URL',
    hint: 'e.g. "gaben_stan_69"',
    gradient: 'from-cyberblue to-grape',
  },
}

export default function Connect() {
  const { platform } = useParams<{ platform: Platform }>()
  const navigate = useNavigate()
  const [handle, setHandle] = useState('')
  const copy = platform === 'spotify' || platform === 'steam' ? COPY[platform] : null

  if (!copy || !platform) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
        <p className="font-body text-white/70">Unknown platform.</p>
        <a href="/" className="font-pixel text-xs text-acid underline underline-offset-4">
          ← back home
        </a>
      </div>
    )
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = handle.trim()
    if (!trimmed) return
    navigate(`/loading/${platform}`, { state: { handle: trimmed } })
  }

  return (
    <div className="relative flex min-h-svh flex-col">
      <Marquee text="⚠ NO PASSWORDS NEEDED ⚠ JUST YOUR DIGNITY ⚠" />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <motion.span
          animate={{ rotate: [0, -6, 6, 0], y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl"
        >
          {copy.emoji}
        </motion.span>

        <h1 className="font-display text-holo text-3xl leading-tight sm:text-5xl">{copy.title}</h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
          <div className="w-full">
            <input
              autoFocus
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={copy.placeholder}
              className="font-body w-full rounded-2xl border-4 border-inkblack bg-white/95 px-5 py-4 text-center text-lg font-semibold text-inkblack shadow-[6px_6px_0_#0b0715] outline-none placeholder:text-inkblack/40 focus:-translate-y-0.5 focus:shadow-[8px_8px_0_#0b0715] transition-transform"
            />
            <p className="font-pixel mt-2 text-[9px] text-white/50">{copy.hint}</p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!handle.trim()}
            className={`font-display w-full rounded-2xl border-4 border-inkblack bg-gradient-to-br px-6 py-4 text-lg text-inkblack shadow-[6px_6px_0_#0b0715] disabled:opacity-40 sm:text-xl ${copy.gradient}`}
          >
            JUDGE ME →
          </motion.button>
        </form>

        <p className="font-pixel max-w-xs text-[9px] leading-relaxed text-white/40">
          ✦ DEMO MODE — showing a sample roast while the real {platform === 'spotify' ? 'Spotify' : 'Steam'} data
          hookup finishes cooking. Full version coming soon.
        </p>

        <a href="/" className="font-pixel text-xs text-acid underline underline-offset-4">
          ← pick a different platform
        </a>
      </main>
    </div>
  )
}
