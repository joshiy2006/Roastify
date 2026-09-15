import { useEffect, useRef } from 'react'

const SPARKLES = ['✦', '✧', '★', '⋆', '✩']
const COLORS = ['#ff2fd0', '#00e5ff', '#d4ff00', '#ffe94d', '#a742ff']

/** Leaves a trail of fading star glyphs behind the pointer, throttled to avoid flooding the DOM. */
export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpawn = useRef(0)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpawn.current < 70) return
      lastSpawn.current = now

      const el = document.createElement('span')
      const glyph = SPARKLES[Math.floor(Math.random() * SPARKLES.length)]
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      el.textContent = glyph
      el.style.position = 'fixed'
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      el.style.color = color
      el.style.fontSize = `${12 + Math.random() * 10}px`
      el.style.pointerEvents = 'none'
      el.style.zIndex = '9999'
      el.style.animation = 'sparkle-fade 1.4s ease-in-out forwards'
      el.style.filter = `drop-shadow(0 0 4px ${color})`
      containerRef.current?.appendChild(el)

      setTimeout(() => el.remove(), 1450)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" />
}
