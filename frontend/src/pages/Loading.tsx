import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { generateRoast, type Platform, type RoastResult } from '../data/mockRoast'
import { API_BASE_URL } from '../lib/api'

const MESSAGES = [
  'dialing up the algorithm...',
  'summoning your questionable taste...',
  'consulting the council of vibes...',
  'calculating cringe coefficient...',
  'preparing zero mercy...',
  'sharpening the roast...',
]

async function fetchSpotifyRoast(): Promise<RoastResult> {
  const response = await fetch(`${API_BASE_URL}/roast/spotify`, { credentials: 'include' })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.detail || 'Could not reach Spotify. Try reconnecting.')
  }
  return response.json()
}

export default function Loading() {
  const { platform } = useParams<{ platform: Platform }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handle = (location.state as { handle?: string } | null)?.handle
  const isOAuthReturn = platform === 'spotify' && searchParams.get('oauth') === 'success'
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!platform || (!handle && !isOAuthReturn)) {
      navigate('/', { replace: true })
      return
    }

    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 500)

    const minDelay = new Promise((resolve) => setTimeout(resolve, 2600))

    const work = isOAuthReturn
      ? fetchSpotifyRoast()
      : Promise.resolve(generateRoast(platform, handle as string))

    Promise.all([work, minDelay])
      .then(([result]) => {
        navigate('/results', { replace: true, state: { platform, result } })
      })
      .catch((err: unknown) => {
        const errorDetail = err instanceof Error ? err.message : undefined
        navigate(`/connect/${platform}?oauth=error`, { replace: true, state: { errorDetail } })
      })

    return () => {
      clearInterval(interval)
    }
  }, [platform, handle, isOAuthReturn, navigate])

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
