'use client'

import { useEffect, useRef } from 'react'

/** Las codificaciones disponibles de un mismo plano, de la más eficiente a la más
 *  compatible. Se descarga UNA. */
interface Sources {
  /** AV1 en MP4. Chrome, Edge, Firefox y Android; en Safari solo el hardware reciente. */
  av1?: string
  /** H.264. El universal, y por eso el último recurso. */
  h264: string
}

interface Props {
  /** Fuentes para pantallas de 768px en adelante. */
  desktop: Sources
  /** Fuentes para teléfonos. */
  mobile: Sources
}

/** Lo que hay que preguntarle al navegador para saber si sabe leer AV1 en MP4. */
const AV1_MIME = 'video/mp4; codecs="av01.0.05M.08"'

/**
 * Se exige `probably`, no `maybe`. `maybe` significa que el navegador reconoce el
 * contenedor pero no se compromete con el códec, y servir AV1 con esa respuesta deja
 * un hero en negro en lugar de caer al H.264 que sí funciona.
 */
function pick(sources: Sources, el: HTMLVideoElement): string {
  if (sources.av1 && el.canPlayType(AV1_MIME) === 'probably') return sources.av1
  return sources.h264
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
      const set = window.matchMedia('(min-width: 768px)').matches ? desktop : mobile
      el.src = pick(set, el)
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
