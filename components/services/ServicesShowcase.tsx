'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
  images: string[]
  /** La cinta de servicio a domicilio. Va DENTRO del escenario, justo después del
   *  mazo, para que quede soldada al pie de la descripción en todo momento en vez de
   *  llegar al final del recorrido y dejar bone entremedias. */
  footer: React.ReactNode
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
export function ServicesShowcase({ t, images, footer }: Props) {
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
    const stage = track.querySelector<HTMLElement>('.svc-stage')

    const read = () => {
      const rect = track.getBoundingClientRect()
      // Contra la altura del ESCENARIO, no la de la pantalla. El escenario mide su
      // contenido — menú más mazo — y se queda fijo exactamente ese tramo. Midiendo
      // contra la pantalla, la secuencia terminaba antes de que la pista acabara, y
      // ese resto se recorría como una franja de bone entre el último recuadro y la
      // cinta de servicio a domicilio.
      const span = rect.height - (stage?.offsetHeight ?? window.innerHeight)
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
      // Solo el recorrido va en línea. La altura la arma globals.css sumando ese
      // recorrido a la altura REAL del escenario, no a 100svh: la pista medía una
      // pantalla entera por abajo mientras el escenario medía su contenido, y esa
      // diferencia quedaba como un hueco de bone entre el último recuadro y la cinta.
      style={{ '--svc-scroll': `${(services.length - 1) * SCROLL_PER_SERVICE * 100}svh` } as React.CSSProperties}
    >
      {/* The stage: pinned on a phone, dissolved back into normal flow from md. */}
      {/* `pt-16` para que la fotografía libre el menú, y nada más: el mazo arranca
          justo ahí, así que no queda holgura delante de la imagen. Antes el escenario
          medía 100svh y el mazo su propia altura, y esa diferencia — 30px en un teléfono
          corto, 224 en uno alto — se abría como un hueco entre el encabezado y la foto. */}
      <div className="svc-stage sticky top-0 flex flex-col pt-[66px] md:static md:block md:pt-0">

        <div className="svc-deck relative flex-none md:static md:grid md:grid-cols-3 md:gap-5">
          {services.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => { cardsRef.current[i] = el }}
              // Stacked and faded on mobile; an ordinary grid cell from md.
              className={cn(
                'svc-card absolute inset-0 flex flex-col md:relative md:inset-auto md:opacity-100',
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
                  className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(22,35,59,0.55),rgba(22,35,59,0))]"
                  aria-hidden="true"
                />

              {/* Title: loose on the photograph below md, under it from md. */}
              {/* Dentro de la fotografía en todos los tamaños. En desktop era
                  `md:static`, y estándo dentro de un contenedor con overflow oculto
                  eso lo dejaba en flujo DETRÁS de la imagen, que va absoluta: el
                  título existía en el DOM y no se veía en ninguna pantalla grande.
                  El cuerpo en móvil lo fija globals.css contra el ancho de la foto;
                  de md en adelante escala por breakpoint porque la tarjeta no sigue
                  al viewport. En md la columna mide 221px y el título más largo pasa
                  a dos líneas antes que bajar del suelo de 24px de Canela. */}
              <h3
                data-svc-text
                className={cn(
                  'svc-title absolute left-4 right-4 bottom-4 z-10 font-fraunces leading-[1.1] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]',
                  'md:text-2xl lg:text-[1.75rem] xl:text-[2rem]',
                )}
              >
                  {item.title}
                </h3>
              </div>

              {/* El recuadro de la descripción, bajo la fotografía, en todos los
                  tamaños. En desktop era texto suelto sobre bone. */}
              <div
                className={cn(
                  // sand, no navy: el bloque de servicio a domicilio que sigue es
                  // navy, y dos bandas navy seguidas se leen como una sola. sand da
                  // 11x de diferencia de luminancia y cambia el registro — se lee
                  // como una tira de papel bajo la foto, no como otro panel oscuro.
                  // `flex-1` también en desktop: la tarjeta es columna flex y la
                  // retícula estira, así que los recuadros de una misma fila acaban
                  // a la misma altura aunque las descripciones tengan 2 o 3 líneas.
                  // El `pr-20` de móvil era para librar el contador, que en desktop
                  // no existe, así que ahí el margen vuelve a ser simétrico.
                  'svc-desc flex-1 bg-sand flex items-center pl-4 pr-20 py-5',
                  'md:px-5 md:py-5',
                )}
              >
                <p data-svc-text className="font-sans text-base md:text-body text-ink/80 leading-relaxed">
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

        {footer}

      </div>
    </div>
  )
}
