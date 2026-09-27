'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Target number, e.g. 5 or 1300 */
  value: number
  /** Decimal places — 1 for a 5.0 rating, 0 for a customer count */
  decimals?: number
  /** Rendered before/after the number, e.g. "★ en Google" */
  prefix?: string
  suffix?: string
  /** Thousands separator for large counts */
  group?: boolean
  durationMs?: number
}

/**
 * Counts once, when it first enters view.
 *
 * The final value is rendered on the server and is what a crawler, a screen reader
 * and a no-JS visitor see — the animation only replaces it once it is certain to
 * finish. aria-hidden on the animating copy plus an sr-only final value means the
 * number is never announced mid-count.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  group = false,
  durationMs = 1600,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const [animating, setAnimating] = useState(false)

  const format = (n: number) => {
    const fixed = n.toFixed(decimals)
    return group ? Number(fixed).toLocaleString('en-US') : fixed
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    let frame = 0
    const run = () => {
      setAnimating(true)
      setDisplay(0)
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1)
        // Same shape as --ease: decisive at first, settling at the end.
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(value * eased)
        if (t < 1) {
          frame = requestAnimationFrame(tick)
        } else {
          setDisplay(value)
          setAnimating(false)
        }
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        run()
        observer.unobserve(el)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, durationMs])

  return (
    <span ref={ref}>
      <span aria-hidden={animating || undefined} className="tabular-nums">
        {prefix}
        {format(display)}
        {suffix}
      </span>
      {animating && (
        <span className="sr-only">
          {prefix}
          {format(value)}
          {suffix}
        </span>
      )}
    </span>
  )
}
