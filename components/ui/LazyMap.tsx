'use client'

import { useState } from 'react'

interface LazyMapProps {
  /** Full Google Maps embed src — swap in a Place ID URL when confirmed */
  src?: string
  className?: string
  ariaLabel?: string
}

const DEFAULT_SRC =
  'https://maps.google.com/maps?q=Av.+Junco+de+la+Vega,+Colonia+Roma,+Monterrey,+NL,+Mexico&z=16&hl=es&output=embed'

export function LazyMap({
  src = DEFAULT_SRC,
  className = '',
  ariaLabel = 'Mapa de ubicación LAVALAVA',
}: LazyMapProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div
        className={`w-full aspect-video max-w-2xl overflow-hidden border border-[var(--line)] ${className}`}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={ariaLabel}
          className="border-0"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className={`w-full aspect-video max-w-2xl border border-[var(--line)] relative overflow-hidden
                  bg-[repeating-linear-gradient(135deg,rgba(27,37,54,0.04)_0px,rgba(27,37,54,0.04)_1px,transparent_1px,transparent_12px)]
                  flex flex-col items-center justify-center gap-3 group cursor-pointer ${className}`}
      aria-label={`Cargar mapa — ${ariaLabel}`}
      type="button"
    >
      <div
        className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center
                   group-hover:bg-teal/15 transition-colors duration-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5E7F84"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2C8.69 2 6 4.69 6 8c0 4.25 6 13 6 13s6-8.75 6-13c0-3.31-2.69-6-6-6Z" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      </div>
      <span className="font-sans text-sm text-ink/50 group-hover:text-ink/70 transition-colors duration-200">
        Ver mapa
      </span>
    </button>
  )
}
