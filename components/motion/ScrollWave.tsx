'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** How many steps the wave connects — used to decide which are lit. */
  steps: number
  /** Called with 0..1 draw progress so the caller can light its own step markers. */
  onProgress?: (activeCount: number) => void
}

/**
 * A vertical teal wave that draws itself as the section scrolls past.
 *
 * Same curve family as the wave mark, turned on its side. The path is stroked with
 * a dasharray equal to its own length and the offset is driven from scroll position,
 * so the line appears to be drawn rather than revealed.
 *
 * preserveAspectRatio="none" lets one fixed viewBox stretch to whatever height the
 * steps end up occupying, which keeps the SVG independent of copy length.
 *
 * Progress is written straight to the node's style on an animation frame. Only the
 * active-step count goes through React, and only when it actually changes — a
 * scroll-linked value re-rendering a tree every frame is how smooth becomes janky.
 */
const VIEWBOX_H = 400
const PATH = 'M10 0 C2 50, 18 100, 10 150 C2 200, 18 250, 10 300 C2 350, 18 380, 10 400'

export function ScrollWave({ steps, onProgress }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const activeRef = useRef(-1)

  useEffect(() => {
    const path = pathRef.current
    if (path) setLen(path.getTotalLength())
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path || !len) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Reduced motion gets the finished state, not a missing one.
      path.style.strokeDashoffset = '0'
      onProgress?.(steps)
      return
    }

    let frame = 0
    const read = () => {
      const rect = wrap.getBoundingClientRect()
      // 0 when the top of the list reaches the lower third of the viewport,
      // 1 when its bottom passes the middle.
      const startAt = window.innerHeight * 0.75
      const span = rect.height + window.innerHeight * 0.25
      const progress = Math.min(Math.max((startAt - rect.top) / span, 0), 1)

      path.style.strokeDashoffset = String(len * (1 - progress))

      const active = Math.round(progress * steps)
      if (active !== activeRef.current) {
        activeRef.current = active
        onProgress?.(active)
      }
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [len, steps, onProgress])

  return (
    <div ref={wrapRef} className="absolute left-0 top-2 bottom-8 w-5" aria-hidden="true">
      <svg
        width="20"
        height="100%"
        viewBox={`0 0 20 ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        fill="none"
        className="overflow-visible"
      >
        <path
          ref={pathRef}
          d={PATH}
          stroke="var(--teal)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={len ? { strokeDasharray: len, strokeDashoffset: len } : undefined}
        />
      </svg>
    </div>
  )
}
