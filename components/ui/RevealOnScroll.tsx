'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  delay?: number
  /** Skip the reveal animation — render visible immediately (use for above-the-fold content) */
  eager?: boolean
}

export function RevealOnScroll({ children, className, stagger = false, delay = 0, eager = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  // eager elements start visible so SSR paints them immediately — no FCP penalty
  const [visible, setVisible] = useState(eager)

  useEffect(() => {
    // eager content is server-rendered visible and stays visible. The previous version
    // set it back to hidden on hydration to replay the stagger, which meant the hero
    // headline painted, vanished, then faded back in — a flash on every load, and on a
    // slow connection the "vanished" state could last a noticeable beat. The entrance
    // animation for above-the-fold content is rebuilt properly in the motion layer;
    // it must never be done by hiding what the server already painted.
    if (eager) return

    const el = ref.current
    if (!el) return

    // If element is already in viewport (e.g. user jumped to anchor), reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => setVisible(true), delay)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      // -10% bottom margin: fire while the section is still entering, so it has
      // finished revealing by the time the reader reaches it. The old -40px fired so
      // late that sections could sit visibly blank mid-scroll.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, eager])

  return (
    <div
      ref={ref}
      className={cn(stagger ? 'reveal-stagger' : 'reveal', visible && 'is-visible', className)}
    >
      {children}
    </div>
  )
}
