import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PlatformButtonProps {
  label: string
  sublabel: string
  emoji: string
  gradient: string
  onClick?: () => void
  children?: ReactNode
}

/** Big glossy chrome CTA button used for the Spotify / Steam picks on the landing page. */
export default function PlatformButton({ label, sublabel, emoji, gradient, onClick }: PlatformButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, rotate: -1.5 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`group relative flex w-full max-w-xs flex-col items-center gap-2 overflow-hidden rounded-[2rem] border-4 border-inkblack p-8 text-inkblack shadow-[8px_8px_0_#0b0715] ${gradient}`}
    >
      <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-sm transition-all duration-500 group-hover:left-full group-hover:opacity-100" />
      <span className="animate-bounce-slow text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)]">{emoji}</span>
      <span className="font-display text-xl tracking-wide sm:text-2xl">{label}</span>
      <span className="font-body text-sm font-semibold opacity-80">{sublabel}</span>
    </motion.button>
  )
}
