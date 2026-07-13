import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { LazyMap } from '@/components/ui/LazyMap'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function LocationSection({ t }: Props) {
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
            <LazyMap />
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
                href="https://maps.google.com/?q=LAVALAVA+Monterrey"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 font-sans text-sm font-semibold text-ink hover:text-ink/60 transition-colors"
              >
                {t.location.directions}
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
