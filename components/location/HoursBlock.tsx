import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * Opening hours, including the closed day stated explicitly.
 *
 * Rendered from t.location.hours — the same array the homepage and footer use — so the
 * three surfaces cannot drift. The JSON-LD side derives independently from
 * BUSINESS.openingHours in lib/seo.ts; those two must be kept in step by hand, which is
 * why both carry a comment saying so.
 */
export function HoursBlock({ t }: Props) {
  const c = t.pages.ubicacion.content.hours

  return (
    <section id="horarios" className="bg-navy py-20 md:py-24 section-px scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow text-teal-soft mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-12 whitespace-pre-line max-w-sm">
            {c.headline}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <ul className="max-w-md">
            {t.location.hours.map((h) => {
              const closed = h.time === c.closedLabel
              return (
                <li
                  key={h.days}
                  className="flex items-baseline justify-between gap-8 py-4 border-b border-bone/12 last:border-b-0"
                >
                  <span className="font-sans text-sm text-bone/55">{h.days}</span>
                  <span
                    className={[
                      'font-fraunces text-lg tabular-nums',
                      closed ? 'text-bone/50' : 'text-bone',
                    ].join(' ')}
                  >
                    {h.time}
                  </span>
                </li>
              )
            })}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={140}>
          <p className="mt-8 font-sans text-sm text-bone/50 leading-relaxed max-w-md">
            {c.note}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
