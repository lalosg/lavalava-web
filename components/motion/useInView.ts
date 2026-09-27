'use client'

import { useEffect, useRef, useState } from 'react'

interface Options {
  /** ms to wait after intersection before revealing — used for staggering siblings */
  delay?: number
  /** Skip observation entirely and start revealed (above-the-fold content) */
  eager?: boolean
}

/**
 * One-shot in-view detection, shared by every reveal primitive.
 *
 * Fires at -10% of the viewport bottom so a section has finished revealing by the
 * time the reader's eye arrives, rather than animating under their nose. Unobserves
 * immediately: these are entrances, not scroll-linked effects, and re-running them
 * on every pass would be noise.
 */
export function useInView({ delay = 0, eager = false }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(eager)
  const [settled, setSettled] = useState(eager)

  useEffect(() => {
    if (eager) return

    const el = ref.current
    if (!el) return

    let timer: ReturnType<typeof setTimeout>
    const reveal = () => {
      timer = setTimeout(() => {
        setVisible(true)
        // Matches the longest transition in globals.css, after which the
        // will-change hint is dropped.
        setTimeout(() => setSettled(true), 1700)
      }, delay)
    }

    // Already on screen (deep link, refresh mid-page, very short page): reveal now
    // rather than waiting for a scroll that may never come.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        reveal()
        observer.unobserve(el)
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [delay, eager])

  return { ref, visible, settled }
}
