import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/** The page's single navy band — the design direction keeps navy as an accent moment. */
export function DeliveryIncluded({ t }: Props) {
  const c = t.pages.aDomicilio.content.included

  return (
    <section className="bg-navy py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow text-teal/70 mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-14 whitespace-pre-line max-w-sm">
            {c.headline}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {c.items.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 70}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-teal/50 flex items-center justify-center mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#5E7F84"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-fraunces text-lg text-bone mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-bone/55 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
