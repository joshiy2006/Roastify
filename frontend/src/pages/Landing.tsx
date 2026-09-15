import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Marquee from '../components/Marquee'
import PlatformButton from '../components/PlatformButton'
import StickerBadge from '../components/StickerBadge'
import VisitorCounter from '../components/VisitorCounter'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-svh flex-col">
      <Marquee text="⚠ YOUR TASTE IS ABOUT TO BE JUDGED ⚠ NO REFUNDS ⚠ 100% AI SAVAGERY ⚠" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-4 py-16 text-center">
        <div className="relative">
          <div className="absolute -left-16 -top-6 hidden sm:block">
            <StickerBadge color="lime" className="rotate-[-14deg]">
              v1.0!
            </StickerBadge>
          </div>
          <div className="absolute -right-24 -top-8 hidden sm:block">
            <StickerBadge color="blue" className="rotate-[10deg]">
              AI
              <br />
              POWERED
            </StickerBadge>
          </div>

          <h1 className="font-display text-chrome text-5xl leading-tight sm:text-7xl md:text-8xl">
            ROASTIFY
          </h1>
          <p className="font-display text-holo mt-2 text-lg sm:text-2xl">
            get absolutely cooked™
          </p>
        </div>

        <p className="font-body max-w-xl text-base font-semibold text-white/80 sm:text-lg">
          Plug in your Spotify or Steam and let an unhinged AI drag your algorithm, your playtime,
          and your entire personality. Screenshots encouraged. Feelings not included.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <PlatformButton
            label="ROAST MY SPOTIFY"
            sublabel="your top artists will not survive this"
            emoji="🎧"
            gradient="bg-gradient-to-br from-bubblegum to-hotpink"
            onClick={() => navigate('/connect/spotify')}
          />
          <PlatformButton
            label="ROAST MY STEAM"
            sublabel="847 hours in one game? sit down."
            emoji="🎮"
            gradient="bg-gradient-to-br from-cyberblue to-grape"
            onClick={() => navigate('/connect/steam')}
          />
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="font-pixel mt-4 text-[10px] text-acid sm:text-xs"
        >
          ↓ scroll for zero additional content, this is the whole site ↓
        </motion.div>
      </main>

      <footer className="flex flex-col items-center gap-4 border-t-4 border-dashed border-white/20 bg-deepspace/60 px-4 py-8 text-center">
        <VisitorCounter />
        <p className="font-pixel text-[9px] leading-relaxed text-white/50 sm:text-[10px]">
          BEST VIEWED AT 1920x1080 · NO COOKIES WERE HARMED · ROAST RESPONSIBLY
        </p>
        <p className="font-body text-xs text-white/40">
          Made with spite and Tailwind. Not affiliated with Spotify AB or Valve Corp.
        </p>
      </footer>

      <Marquee text="⚡ SHARE YOUR ROAST ⚡ TAG A FRIEND WHO NEEDS HUMBLING ⚡" />
    </div>
  )
}
