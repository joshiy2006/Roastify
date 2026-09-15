import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { generateRoast, type Platform } from '../data/mockRoast'

const MESSAGES = [
  'dialing up the algorithm...',
  'summoning your questionable taste...',
  'consulting the council of vibes...',
  'calculating cringe coefficient...',
  'preparing zero mercy...',
  'sharpening the roast...',
]

export default function Loading() {
  const { platform } = useParams<{ platform: Platform }>()
  const location = useLocation()
  const navigate = useNavigate()
  const handle = (location.state as { handle?: string } | null)?.handle
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!platform || !handle) {
      navigate('/', { replace: true })
      return
    }

    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 500)

    const timeout = setTimeout(() => {
      const result = generateRoast(platform, handle)
      navigate('/results', { replace: true, state: { platform, result } })
    }, 2600)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [platform, handle, navigate])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-4 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-dashed border-acid text-5xl"
      >
        💿
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="font-pixel text-xs text-holo sm:text-sm"
        >
          {MESSAGES[messageIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="h-3 w-64 overflow-hidden rounded-full border-2 border-inkblack bg-white/10">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-hotpink via-grape to-cyberblue"
        />
      </div>
    </div>
  )
}
