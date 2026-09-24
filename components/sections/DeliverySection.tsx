import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink, localePath } from '@/lib/translations'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

export function DeliverySection({ t, locale }: Props) {
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
            <WhatsAppIcon size={16} />
            {t.delivery.cta}
          </a>
          {/* Plain <a>, not next/link: importing Link into the homepage's server
            components pulled the client router into this route's bundle and cost
            9 kB of First Load JS (measured 103 -> 112 kB). Crawlers only read the
            href, so the SEO value is identical, and the header nav still offers a
            soft-navigation path to the same pages. */}
          <a
            href={localePath(locale, '/a-domicilio')}
            className="block mt-5 font-sans text-xs text-bone/45 hover:text-bone/70 transition-colors"
          >
            {t.delivery.learnMore}
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
