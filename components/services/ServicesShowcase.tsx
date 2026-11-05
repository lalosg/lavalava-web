'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
  images: string[]
  /** Eyebrow + headline. They live inside the pinned stage on a phone so they stay
   *  visible while the sequence changes under them, and above the grid from md. */
  header: React.ReactNode
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
export function ServicesShowcase({ t, images, header }: Props) {
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
      <div className="svc-stage sticky top-0 h-[100svh] flex flex-col pt-20 overflow-hidden md:static md:block md:h-auto md:pt-0 md:overflow-visible">

        {/* Lo que sobre tras reservar imagen y descripción. El titular se dimensiona
            con clamp sobre esa sobra, así que encoge en lugar de cortarse. */}
        <div className="svc-head flex-1 min-h-0 flex flex-col justify-end px-4 pb-5 md:block md:px-0 md:pb-0">
          {header}
        </div>

        <div className="svc-deck relative flex-none md:static md:grid md:grid-cols-3 md:gap-5">
          {services.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => { cardsRef.current[i] = el }}
              // Stacked and faded on mobile; an ordinary grid cell from md.
              className={cn(
                'svc-card absolute inset-0 flex flex-col md:block md:relative md:inset-auto md:opacity-100',
                // Before hydration every card would otherwise be at full opacity and
                // they would all show at once. The first is visible, the rest wait.
                i === 0 ? 'opacity-100' : 'opacity-0 md:opacity-100',
              )}
            >
              <div className="svc-media relative w-full flex-none aspect-[3/4] overflow-hidden md:aspect-[3/4]">
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
                {/* Degradado solo bajo el título, para que el blanco se lea sobre
                    cualquier foto sin oscurecer la composición entera. */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 md:hidden bg-[linear-gradient(to_top,rgba(22,35,59,0.55),rgba(22,35,59,0))]"
                  aria-hidden="true"
                />

              {/* Title: loose on the photograph below md, under it from md. */}
              <h3
                className={cn(
                  'svc-title absolute left-4 right-4 bottom-4 z-10 font-fraunces text-[1.9rem] leading-[1.1] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]',
                  'md:static md:text-ink md:[text-shadow:none] md:font-sans md:font-semibold md:text-xl md:leading-snug md:mt-3 md:mb-1',
                )}
              >
                  {item.title}
                </h3>
              </div>

              {/* Description: a navy panel anchored to the foot of the photograph on a
                  phone, plain body copy from md. */}
              <div
                className={cn(
                  // sand, no navy: el bloque de servicio a domicilio que sigue es
                  // navy, y dos bandas navy seguidas se leen como una sola. sand da
                  // 11x de diferencia de luminancia y cambia el registro — se lee
                  // como una tira de papel bajo la foto, no como otro panel oscuro.
                  'svc-desc flex-1 bg-sand flex items-center pl-4 pr-20 py-5',
                  'md:block md:flex-none md:bg-transparent md:p-0',
                )}
              >
                <p className="font-sans text-base md:text-body text-ink/80 md:text-ink/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}

        {/* Counter and progress, phones only. Not jump navigation: six dots are tiny
            targets and clutter the composition, and nobody arrives wanting service
            four. What a pinned section actually owes the reader is "how much is
            left", which is a question about anxiety, not navigation. */}
        <div className="svc-counter absolute top-4 right-4 z-20 md:hidden flex items-center gap-3" aria-hidden="true">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-white/85 tabular-nums [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </span>
          <span className="block h-px w-12 bg-white/35 overflow-hidden">
            <span
              className="block h-full bg-white/90 transition-[width] duration-500 [transition-timing-function:var(--ease)]"
              style={{ width: `${((active + 1) / services.length) * 100}%` }}
            />
          </span>
        </div>
        </div>

      </div>
    </div>
  )
}
