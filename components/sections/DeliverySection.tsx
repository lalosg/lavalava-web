import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function DeliverySection({ t }: Props) {
  return (
    <section className="bg-navy py-20 flex flex-col">
      <div className="max-w-6xl mx-auto w-full section-px">
        <RevealOnScroll>
          <p className="eyebrow text-teal/70 mb-4">{t.delivery.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-6 whitespace-pre-line max-w-sm">
            {t.delivery.headline}
          </h2>
          <p className="font-sans text-sm text-bone/50 leading-relaxed mb-10 max-w-md">
            {t.delivery.description}
          </p>
        </RevealOnScroll>

        {/* Image placeholder */}
        <RevealOnScroll delay={80}>
          <div
            className="mb-10 aspect-[4/3] max-w-sm
                       bg-[repeating-linear-gradient(135deg,rgba(247,244,238,0.07)_0px,rgba(247,244,238,0.07)_2px,transparent_2px,transparent_14px)]
                       border border-bone/18 flex items-center justify-center"
          >
            <span className="text-xs text-bone/25 font-sans tracking-eyebrow uppercase">
              FOTO — recogida a domicilio
            </span>
          </div>
        </RevealOnScroll>

        {/* Benefits */}
        <RevealOnScroll stagger delay={80}>
          <ul className="flex flex-col gap-3 mb-10">
            {t.delivery.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full border border-teal/50 flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#5E7F84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-sans text-sm text-bone/65 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <a
            href={waLink(t.delivery.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-teal text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.delivery.cta}
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
