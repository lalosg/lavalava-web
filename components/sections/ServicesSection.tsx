import Image from 'next/image'
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
  const regularServices = t.services.items.slice(0, 6)
  const deliveryService = t.services.items[6]

  return (
    <section className="bg-bone py-20 section-px">
      <div className="max-w-6xl mx-auto">

        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-12 whitespace-pre-line max-w-sm">
            {t.services.headline}
          </h2>
        </RevealOnScroll>

        {/* Image-card grid: 2-col mobile / 3-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {regularServices.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 60}>
              <div className="group">

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={serviceImages[i]}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Hover overlay with description — desktop only */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent px-4 pt-10 pb-4
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                    <p className="font-sans text-xs text-white/85 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Label */}
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="font-fraunces text-sm md:text-base text-ink leading-snug">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="flex-shrink-0 text-[10px] font-sans font-semibold tracking-eyebrow text-teal uppercase mt-0.5">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Description — mobile always visible, desktop on hover (overlay above) */}
                <p className="font-sans text-xs text-ink/50 leading-relaxed md:hidden">
                  {item.description}
                </p>

              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Servicio a domicilio — full-width navy feature */}
        {deliveryService && (
          <RevealOnScroll delay={80}>
            <div className="mt-5 bg-navy p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-sand/40 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4D8C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-fraunces text-base text-bone">{deliveryService.title}</h3>
                  {deliveryService.badge && (
                    <span className="text-[10px] font-sans font-semibold tracking-eyebrow text-teal uppercase">
                      {deliveryService.badge}
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-bone/50 leading-relaxed">
                  {deliveryService.description}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={120}>
          {/* Plain <a>, not next/link: importing Link into the homepage's server
            components pulled the client router into this route's bundle and cost
            9 kB of First Load JS (measured 103 -> 112 kB). Crawlers only read the
            href, so the SEO value is identical, and the header nav still offers a
            soft-navigation path to the same pages. */}
          <a
            href={localePath(locale, '/servicios')}
            className="inline-block mt-8 font-sans text-xs text-ink/40 hover:text-ink/60 transition-colors"
          >
            {t.services.cta}
          </a>
        </RevealOnScroll>

      </div>
    </section>
  )
}
