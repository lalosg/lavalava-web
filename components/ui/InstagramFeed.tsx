'use client'

import { useEffect } from 'react'

interface InstagramFeedProps {
  /**
   * Behold.so widget ID — create a free account at behold.so,
   * connect your @lavalava.vip Instagram, then paste the widget ID here.
   * Leave undefined to show the placeholder grid.
   */
  widgetId?: string
  placeholderCount?: number
}

export function InstagramFeed({ widgetId, placeholderCount = 6 }: InstagramFeedProps) {
  useEffect(() => {
    if (!widgetId) return
    if (document.querySelector('script[data-behold]')) return
    const script = document.createElement('script')
    script.src = 'https://w.behold.so/widget.js'
    script.type = 'module'
    script.setAttribute('data-behold', 'true')
    document.head.appendChild(script)
  }, [widgetId])

  if (widgetId) {
    return <div data-behold-id={widgetId} className="w-full" />
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-sand/40 border border-[var(--line)] flex items-center justify-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(27,37,54,0.2)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="rgba(27,37,54,0.2)" stroke="none" />
          </svg>
        </div>
      ))}
    </div>
  )
}
