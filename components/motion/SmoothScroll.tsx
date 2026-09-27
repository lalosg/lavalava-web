'use client'

import { useEffect } from 'react'

/**
 * Lenis smooth scrolling — desktop pointers only.
 *
 * Deliberately NOT enabled on touch. iOS Safari's native scrolling is rubber-banded,
 * momentum-tuned and interruptible in ways a JS scroller cannot match; replacing it
 * makes a premium site feel worse, not better, and it fights the browser's own
 * address-bar collapse. Touch devices keep native scroll and lose nothing — the
 * reveals do all the work there.
 *
 * Also off under prefers-reduced-motion, where animating scroll position is exactly
 * the kind of movement the setting exists to prevent.
 *
 * Loaded dynamically so the library never enters the bundle for the visitors who
 * will not run it — which, at 87% mobile traffic, is almost everyone.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let frame = 0
    let cancelled = false

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.1,
        // Matches --ease in globals.css, so scroll and reveals share one feel.
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
      })
      const raf = (time: number) => {
        lenis?.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return null
}
