'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  /** Maximum drift as a fraction of scroll distance. 0.08 = the brief's 8% ceiling. */
  strength?: number
}

/**
 * Subtle parallax drift on the hero photograph.
 *
 * Writes a transform directly to the node on an animation frame rather than going
 * through React state — a scroll-linked value re-rendering a tree 60 times a second
 * is exactly how a smooth page becomes a janky one.
 *
 * Off under prefers-reduced-motion, and off once the hero has scrolled past, so the
 * listener stops doing work for a element nobody can see.
 */
export function HeroParallax({ children, strength = 0.08 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    let frame = 0
    const read = () => {
      const y = window.scrollY
      // Stop writing once the hero is fully off screen.
      if (y < window.innerHeight) {
        el.style.transform = `translate3d(0, ${(y * strength).toFixed(2)}px, 0)`
      }
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  // No permanent will-change: it promotes a full-viewport layer for the entire life
  // of the page, and the hint is only worth anything while the element is actually
  // moving. The transform below is already compositor-only.
  return (
    <div ref={ref} className="absolute inset-0">
      {children}
    </div>
  )
}
