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

/** How much scroll each service costs, as a fraction of the viewport.
 *  At 0.7 a single thumb flick carried the reader past two services, so nothing
 *  ever sat still. 0.9 plus the dwell below means one flick is about one service. */
const SCROLL_PER_SERVICE = 0.9

/** Fraction of each service's scroll segment the photograph holds perfectly still
 *  before the dissolve begins. Without it the sequence is never at rest: a linear
 *  crossfade across the whole segment means the reader is almost always looking at
 *  a blend rather than at a photograph. */
const DWELL = 0.45

/** The words cut, the photograph dissolves. Inside the dissolve window, the outgoing
 *  text is gone by TEXT_OUT and the incoming text arrives at TEXT_IN, so there is a
 *  beat in the middle with no words at all. Fading both at the image's rate printed
 *  two titles and two descriptions on top of each other for most of the transition. */
const TEXT_OUT = 0.35
const TEXT_IN = 0.65

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
  const textsRef = useRef<HTMLElement[][]>([])
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
      textsRef.current.forEach((group) => group?.forEach((el) => { el.style.opacity = '' }))
    }

    // Collected once rather than queried every frame.
    const collectText = () => {
      textsRef.current = cardsRef.current.map((card) =>
        card ? Array.from(card.querySelectorAll<HTMLElement>('[data-svc-text]')) : [],
      )
    }

    // From md up this is a plain grid and nothing should be driving opacity.
    // Under reduced motion every card is simply shown; the layout still stacks them,
    // so the last one wins and the reader scrolls past a still image rather than a
    // sequence that animates under them.
    if (mqDesktop.matches || mqReduced.matches) {
      clearInline()
      return
    }

    collectText()

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
    /** Smoothstep: the dissolve eases in and out instead of starting and stopping
     *  abruptly at the edges of its window. */
    const smooth = (v: number) => v * v * (3 - 2 * v)

    let frame = 0
    const read = () => {
      const rect = track.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const progress = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0
      const exact = progress * (services.length - 1)

      // The current pair, and how far through their segment we are.
      const seg = Math.max(0, Math.min(Math.floor(exact), services.length - 2))
      const f = exact - seg
      const u = f <= DWELL ? 0 : (f - DWELL) / (1 - DWELL)

      // The incoming card fades in ON TOP of an outgoing card that stays fully
      // opaque. A symmetric crossfade — both at 0.5 in the middle — composites to
      // only 75% coverage, so the bone background washed through the photograph and
      // both titles and both descriptions were legible at once. Verified in a
      // screenshot at the midpoint before this was changed. Cards paint in DOM
      // order, so no z-index is needed.
      const blend = smooth(u)
      const outAlpha = 1 - clamp01(u / TEXT_OUT)
      const inAlpha = clamp01((u - TEXT_IN) / (1 - TEXT_IN))

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        // Only ever two cards are painted: everything already passed is dropped to
        // zero rather than left opaque underneath, so the compositor holds two
        // full-screen layers instead of six.
        el.style.opacity = i === seg ? '1' : i === seg + 1 ? String(blend) : '0'
        const alpha = i === seg ? outAlpha : i === seg + 1 ? inAlpha : 1
        textsRef.current[i]?.forEach((node) => { node.style.opacity = String(alpha) })
      })

      // Flips once the incoming photograph is more than half there. Rounding `exact`
      // instead moved the counter in the middle of the dwell, while the screen was
      // still showing the previous service.
      const next = blend >= 0.5 ? seg + 1 : seg
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
      frame = 0
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    const onChange = () => {
      if (mqDesktop.matches || mqReduced.matches) clearInline()
      else { collectText(); read() }
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
      {/* Columna simple: el encabezado arriba bajo el menú, el mazo abajo. Ninguno
          necesita `justify-*` porque el reparto lo decide el calc de globals.css y
          por construcción suma 100svh exactos — no sobra ni falta espacio que repartir. */}
      <div className="svc-stage sticky top-0 h-[100svh] flex flex-col justify-end pt-20 overflow-hidden md:static md:block md:h-auto md:pt-0 md:overflow-visible">

        {/* El eyebrow arranca en el borde superior de esta caja, que es justo debajo
            del menú, y el titular va pegado a él. La holgura sobrante queda ABAJO,
            entre el titular y la fotografía, nunca arriba: así "SERVICIOS" no puede
            quedar bajo la barra en ninguna altura de pantalla. */}
        <div className="svc-head flex-1 min-h-0 flex flex-col px-4 pb-5 md:block md:px-0 md:pb-0">
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
              {/* Sized in globals.css, not here: below md it scales with the width
                  it has to fit into, which is what decides whether the longest
                  title wraps. Tailwind cannot express that and keep the md
                  override legible. */}
              <h3
                data-svc-text
                className={cn(
                  'svc-title absolute left-4 right-4 bottom-4 z-10 font-fraunces leading-[1.1] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]',
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
                <p data-svc-text className="font-sans text-base md:text-body text-ink/80 md:text-ink/65 leading-relaxed">
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
