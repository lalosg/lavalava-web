import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { LazyMap } from '@/components/ui/LazyMap'
import { localePath } from '@/lib/translations'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

export function LocationSection({ t, locale }: Props) {
  return (
    <section className="bg-bone-alt py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.location.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-10 whitespace-pre-line max-w-sm">
            {t.location.headline}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mb-10">
            <LazyMap ariaLabel={t.location.mapLabel} ctaLabel={t.location.mapCta} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Address */}
            <div className="flex flex-col gap-1">
              <address className="not-italic font-sans text-sm text-ink/65 leading-relaxed">
                {t.location.address}<br />
                {t.location.city}
              </address>
              <p className="font-sans text-xs text-teal/80 mt-1">{t.location.nearby}</p>
              <a
                href="https://share.google/2JPAcqEaTyrn6Dl3r"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 font-sans text-sm font-semibold text-ink hover:text-ink/60 transition-colors"
              >
                {t.location.directions}
              </a>
              {/* Plain <a>, not next/link: importing Link into the homepage's server
                components pulled the client router into this route's bundle and cost
                9 kB of First Load JS (measured 103 -> 112 kB). Crawlers only read the
                href, so the SEO value is identical, and the header nav still offers a
                soft-navigation path to the same pages. */}
              <a
                href={localePath(locale, '/ubicacion')}
                className="mt-2 font-sans text-xs text-ink/40 hover:text-ink/65 transition-colors"
              >
                {t.location.moreInfo}
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-2">
              {t.location.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-8 border-b border-[var(--line)] pb-2">
                  <span className="font-sans text-sm text-ink/45">{h.days}</span>
                  <span className="font-sans text-sm font-medium text-ink">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
