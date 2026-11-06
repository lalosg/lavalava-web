import { ArrowLabel } from '@/components/ui/ArrowLabel'
import { ServicesShowcase } from '@/components/services/ServicesShowcase'
import { RevealText } from '@/components/motion/RevealText'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { localePath } from '@/lib/translations'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

const serviceImages = [
  '/images/services/service_laundry.jpg',
  '/images/services/service_drycleaning.jpg',
  '/images/services/service_ironing.jpg',
  '/images/services/service_fixes.jpg',
  '/images/services/service_duvet.jpg',
  '/images/services/service_tennis.jpg',
]

export function ServicesSection({ t, locale }: Props) {
  const deliveryService = t.services.items[6]

  return (
    <section className="bg-bone py-20 section-px">
      <div className="max-w-6xl mx-auto">

        {/* El encabezado vive AQUÍ, en flujo normal, no dentro del escenario fijo.
            Dentro no cabía: en un iPhone con sus barras, menú + foto a sangre sin
            recortar + recuadro piden 694px de los ~658 disponibles, con el titular ya
            en cero. Meterlo dentro obligaba a encogerlo a 10px o a esconderlo bajo el
            menú — las dos cosas se vieron en dispositivo. Aquí se lee entero, a su
            tamaño, y sube con el scroll antes de que la secuencia tome la pantalla. */}
        <RevealOnScroll>
          <p className="eyebrow mb-3 md:mb-4">{t.services.eyebrow}</p>
          <RevealText
            as="h2"
            text={t.services.headline}
            className="font-fraunces text-ink text-[2.25rem] leading-[1.12] md:text-5xl md:leading-tight mb-8 md:mb-12 max-w-sm"
          />
        </RevealOnScroll>

        <ServicesShowcase t={t} images={serviceImages} />

        {/* Servicio a domicilio — en móvil es una cinta a sangre pegada al pie del
            panel sand: cierra la secuencia y la separa de lo que sigue sin dejar
            un marco bone de por medio. Desde md vuelve a ser un bloque dentro de
            la retícula, con su respiro de 1.25rem. */}
        {deliveryService && (
          /* Pegada al pie de la pantalla durante toda la secuencia, en vez de aparecer
             al final. El escenario va por encima (z-10 y fondo bone), así que donde la
             secuencia ocupa la pantalla entera la cinta queda detrás y no se ve; solo
             asoma en la franja que el escenario deja libre, que es justo el hueco que
             antes quedaba en blanco. El envoltorio existe porque `left-1/2` en un
             elemento `sticky` es un umbral de pegado, no un desplazamiento: el truco
             de sangrado necesita seguir viviendo en un `relative`. */
          <div className="svc-ribbon sticky bottom-0 z-0 md:static">
          <div className="relative w-screen left-1/2 -translate-x-1/2 bg-navy px-5 py-6 flex items-center gap-4 md:w-auto md:left-auto md:translate-x-0 md:mt-5 md:p-6">
            <div className="w-10 h-10 rounded-full border border-sand/40 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4D8C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-sans font-semibold text-lg text-bone">{deliveryService.title}</h3>
              </div>
              <p className="font-sans text-sm text-bone/50 leading-relaxed">
                {deliveryService.description}
              </p>
              </div>
          </div>
          </div>
        )}

        <RevealOnScroll delay={120}>
          {/* Plain <a>, not next/link: importing Link into the homepage's server
            components pulled the client router into this route's bundle and cost
            9 kB of First Load JS (measured 103 -> 112 kB). Crawlers only read the
            href, so the SEO value is identical, and the header nav still offers a
            soft-navigation path to the same pages. */}
          <a
            href={localePath(locale, '/servicios')}
            className="tap inline-block mt-8 font-sans text-sm font-semibold text-ink/65 hover:text-ink/90 transition-colors"
          >
            <ArrowLabel>{t.services.cta}</ArrowLabel>
          </a>
        </RevealOnScroll>

      </div>
    </section>
  )
}
