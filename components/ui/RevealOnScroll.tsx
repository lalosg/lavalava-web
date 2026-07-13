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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (eager) {
      // Tiny rAF delay so the browser has painted once before animating in
      const id = requestAnimationFrame(() => setTimeout(() => setVisible(true), delay))
      return () => cancelAnimationFrame(id)
    }

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
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
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
