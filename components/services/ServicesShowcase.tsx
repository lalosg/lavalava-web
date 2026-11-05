'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
  images: string[]
}

/** How much scroll each service costs, as a fraction of the viewport. */
const SCROLL_PER_SERVICE = 0.7

/**
 * The six services: a pinned, scroll-driven sequence on phones; the untouched 3x2
 * grid from md up.
 *
 * ONE set of markup serves both. The alternative — a grid and a sequence side by
 * side, each hidden at the other's breakpoint — would put all six titles and
 * descriptions in the DOM twice, which is the duplication this site removed from the
 * service cards two commits ago and cannot afford on an AEO-first page. So the layout
 * switches with responsive classes: each card is `absolute inset-0` on mobile and
 * `relative` in a grid from md, and the copy sits on the photograph below md and
 * under it above.
 *
 * Sticky with reserved height, NOT scroll-jacking. The page scrolls at the speed the
 * thumb asks for, with its own momentum; the sequence simply holds still while it
 * passes. Intercepting scroll to animate it feels broken on a phone, and if the
 * reader keeps going they leave — they are never trapped.
 */
export function ServicesShowcase({ t, images }: Props) {
  const services = t.services.items.slice(0, 6)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const mqDesktop = window.matchMedia('(min-width: 768px)')
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Opacity is written straight to the nodes rather than through React state: a
    // scroll-linked value re-rendering six cards every frame is how a smooth page
    // becomes a janky one. Only the counter goes through state, and only when the
    // index actually changes.
    const clearInline = () => {
      cardsRef.current.forEach((el) => { if (el) el.style.opacity = '' })
    }

    // From md up this is a plain grid and nothing should be driving opacity.
    // Under reduced motion every card is simply shown; the layout still stacks them,
    // so the last one wins and the reader scrolls past a still image rather than a
    // sequence that animates under them.
    if (mqDesktop.matches || mqReduced.matches) {
      clearInline()
      return
    }

    let frame = 0
    const read = () => {
      const rect = track.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const progress = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0
      const exact = progress * (services.length - 1)

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        // Linear crossfade between neighbours; everything further away is fully out.
        const d = Math.abs(exact - i)
        el.style.opacity = String(d >= 1 ? 0 : 1 - d)
      })

      const next = Math.round(exact)
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
      frame = 0
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    const onChange = () => {
      if (mqDesktop.matches || mqReduced.matches) clearInline()
      else read()
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    mqDesktop.addEventListener('change', onChange)
    mqReduced.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mqDesktop.removeEventListener('change', onChange)
      mqReduced.removeEventListener('change', onChange)
      if (frame) cancelAnimationFrame(frame)
      clearInline()
    }
  }, [services.length])

  return (
    <div
      ref={trackRef}
      className="svc-track relative w-screen left-1/2 -translate-x-1/2 md:w-auto md:left-auto md:translate-x-0 md:h-auto"
      style={{ height: `calc(100svh + ${(services.length - 1) * SCROLL_PER_SERVICE * 100}svh)` }}
    >
      {/* The stage: pinned on a phone, dissolved back into normal flow from md. */}
      <div className="svc-stage sticky top-0 h-[100svh] overflow-hidden md:static md:h-auto md:overflow-visible">
        <div className="svc-grid h-full md:grid md:grid-cols-3 md:gap-5">
          {services.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => { cardsRef.current[i] = el }}
              // Stacked and faded on mobile; an ordinary grid cell from md.
              className={cn(
                // En móvil: columna con la imagen arriba y el texto debajo, y pt-16
                // para librar el header fijo. Desde md vuelve a ser celda de rejilla.
                'svc-card absolute inset-0 flex flex-col pt-16 md:block md:relative md:inset-auto md:pt-0 md:opacity-100',
                // Before hydration every card would otherwise be at full opacity and
                // they would all show at once. The first is visible, the rest wait.
                i === 0 ? 'opacity-100' : 'opacity-0 md:opacity-100',
              )}
            >
              <div className="svc-media relative w-full aspect-[3/4] overflow-hidden md:aspect-[3/4]">
                <Image
                  src={images[i]}
                  alt={item.title}
                  fill
                  // Only the first carries priority. Six full-screen photographs all
                  // fetched eagerly would undo the 1.6s LCP this page holds.
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'lazy'}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 30vw, 260px"
                />
              </div>

              {/* Title: loose on the photograph below md, under it from md. */}
              <h3
                className={cn(
                  'svc-title font-fraunces text-[1.75rem] leading-[1.15] text-ink mt-6 mb-2 px-4',
                  'md:font-sans md:font-semibold md:text-xl md:leading-snug md:mt-3 md:mb-1 md:px-0',
                )}
              >
                {item.title}
              </h3>

              {/* Description: a navy panel anchored to the foot of the photograph on a
                  phone, plain body copy from md. */}
              <div
                className={cn(
                  'svc-desc px-4',
                  'md:p-0',
                )}
              >
                <p className="font-sans text-base md:text-body text-ink/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Counter and progress, phones only. Not jump navigation: six dots are tiny
            targets and clutter the composition, and nobody arrives wanting service
            four. What a pinned section actually owes the reader is "how much is
            left", which is a question about anxiety, not navigation. */}
        <div className="svc-counter absolute left-4 bottom-8 md:hidden flex items-center gap-3" aria-hidden="true">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-ink/65 tabular-nums">
            {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
          <span className="block h-px w-16 bg-ink/20 overflow-hidden">
            <span
              className="block h-full bg-ink/70 transition-[width] duration-500 [transition-timing-function:var(--ease)]"
              style={{ width: `${((active + 1) / services.length) * 100}%` }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
