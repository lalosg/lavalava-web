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
        {/* La cinta viaja DENTRO del escenario fijo, justo después del mazo, para
            quedar soldada al pie de la descripción. Fuera de él llegaba solo al
            terminar el recorrido, así que entre el último recuadro y ella quedaba una
            franja de bone y la cinta se presentaba de golpe. No es sticky ni se
            adelanta a nada: ocupa siempre el mismo sitio del apilado, debajo de la
            descripción, y asoma cuando la pantalla da para ello. */}
        <ServicesShowcase
          t={t}
          images={serviceImages}
          footer={
            deliveryService ? (
              <div className="svc-ribbon relative w-screen left-1/2 -translate-x-1/2 flex-none bg-navy section-px md:mt-5">
                <div className="max-w-6xl mx-auto py-6 flex items-center gap-4 md:py-7">
                  <div className="w-10 h-10 rounded-full border border-sand/40 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4D8C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-semibold text-lg text-bone mb-1">{deliveryService.title}</h3>
                    <p className="font-sans text-sm text-bone/50 leading-relaxed">
                      {deliveryService.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          }
        />

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
