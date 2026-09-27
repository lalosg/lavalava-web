import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/** The page's navy band — the design direction keeps navy as an accent moment. */
export function CareSteps({ t }: Props) {
  const c = t.pages.servicios.content.care

  return (
    <section className="bg-navy py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow text-teal-soft mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-14 whitespace-pre-line max-w-md">
            {c.headline}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {c.steps.map((step, i) => (
            <RevealOnScroll key={step.title} delay={i * 70}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 font-fraunces text-sm text-teal-soft mt-1 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-fraunces text-lg text-bone mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-bone/55 leading-relaxed max-w-sm">
                    {step.description}
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
