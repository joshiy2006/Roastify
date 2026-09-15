import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import Marquee from '../components/Marquee'

const COPY: Record<string, { emoji: string; title: string }> = {
  spotify: { emoji: '🎧', title: 'SPOTIFY ROASTER' },
  steam: { emoji: '🎮', title: 'STEAM ROASTER' },
}

/** Placeholder for the connect/results flow, wired up in a later batch. */
export default function ComingSoon() {
  const { platform } = useParams()
  const copy = COPY[platform ?? ''] ?? { emoji: '🚧', title: 'COMING SOON' }

  return (
    <div className="relative flex min-h-svh flex-col">
      <Marquee text="🚧 UNDER CONSTRUCTION 🚧 CHECK BACK SOON 🚧" />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl"
        >
          {copy.emoji}
        </motion.span>
        <h1 className="font-display text-holo text-3xl sm:text-5xl">{copy.title}</h1>
        <p className="font-body max-w-md text-white/70">
          The connect flow is being built in the next batch. Come back shortly to get roasted.
        </p>
        <a href="/" className="font-pixel text-xs text-acid underline underline-offset-4">
          ← back to safety
        </a>
      </main>
    </div>
  )
}
