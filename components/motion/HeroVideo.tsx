'use client'

import { useEffect, useRef } from 'react'

interface Props {
  /** Fuente para pantallas de 768px en adelante. */
  desktop: string
  /** Fuente para teléfonos. Se descarga UNA de las dos, nunca las dos. */
  mobile: string
}

/**
 * El vídeo del hero, encima de la fotografía.
 *
 * La fotografía se queda donde está y hace de póster: es ella la que pinta el primer
 * cuadro y la que mide el LCP, y el vídeo llega después, por encima. Un `<video>` con
 * `poster` habría servido para una sola imagen, pero este hero está dirigido por arte
 * — hay una versión vertical y una horizontal — y `poster` no admite `media`.
 *
 * Nada de esto se descarga hasta que la página ha terminado de cargar. Son megas, y
 * pelearlos contra el LCP en un teléfono sería cambiar una métrica real por un adorno.
 * El `src` se asigna en cliente, así que tampoco viaja en el HTML y ningún preescaneo
 * del navegador lo adelanta.
 *
 * No se descarga en absoluto si el lector pidió menos movimiento, si el navegador
 * anuncia ahorro de datos, o si la conexión es 2G/3G. En esos casos se queda la
 * fotografía, que es un hero correcto por sí misma.
 */
export function HeroVideo({ desktop, mobile }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // `connection` sigue sin estar en los tipos del DOM y no existe en Safari.
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection
    if (conn?.saveData) return
    if (conn?.effectiveType && /(^|-)2g$|^3g$/.test(conn.effectiveType)) return

    let cancelled = false

    const attach = () => {
      if (cancelled) return
      el.src = window.matchMedia('(min-width: 768px)').matches ? desktop : mobile
      el.load()
      // `play()` devuelve una promesa que el navegador rechaza si decide no permitir
      // la reproducción automática. No es un error que haya que gritar: significa que
      // se queda la fotografía, que es exactamente el respaldo previsto.
      el.play().then(
        () => { if (!cancelled) el.classList.add('is-playing') },
        () => {},
      )
    }

    // Después de `load` y, si existe, en el primer hueco de inactividad: el vídeo entra
    // cuando la página ya está servida, nunca compitiendo con ella.
    const idle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => void })
        .requestIdleCallback
      if (ric) ric(attach)
      else setTimeout(attach, 200)
    }

    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', idle)
    }
  }, [desktop, mobile])

  return (
    <video
      ref={ref}
      // `muted` no es estético: sin él ningún navegador reproduce solo. `playsInline`
      // impide que iOS lo abra a pantalla completa. `preload="none"` para que el
      // elemento no pida nada por su cuenta antes de que el efecto lo decida.
      muted
      loop
      playsInline
      preload="none"
      // Decorativo: el texto alternativo del hero lo llevan las fotografías de debajo,
      // y duplicarlo aquí solo añadiría ruido a un lector de pantalla.
      aria-hidden="true"
      tabIndex={-1}
      className="hero-video absolute inset-0 h-full w-full object-cover object-center"
    />
  )
}
