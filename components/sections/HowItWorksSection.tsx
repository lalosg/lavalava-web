import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function HowItWorksSection({ t }: Props) {
  const steps = t.howItWorks.steps

  return (
    <section className="bg-bone-alt py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.howItWorks.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-14 whitespace-pre-line max-w-sm">
            {t.howItWorks.headline}
          </h2>
        </RevealOnScroll>

        {/* Steps with vertical timeline line */}
        <div className="relative max-w-lg">
          {/* Timeline line */}
          <div
            className="absolute left-[17px] top-3 bottom-10 w-px bg-[var(--line)]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1
              return (
                <RevealOnScroll key={step.number} delay={i * 80}>
                  <div className="flex gap-5 relative">
                    {/* Step circle */}
                    <div
                      className={[
                        'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10',
                        isLast
                          ? 'bg-teal'
                          : 'bg-bone-alt border border-ink/25',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'font-fraunces text-sm',
                          isLast ? 'text-bone' : 'text-ink',
                        ].join(' ')}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pb-2">
                      <h3 className="font-fraunces text-lg text-ink mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
