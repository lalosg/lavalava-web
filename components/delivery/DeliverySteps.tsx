import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function DeliverySteps({ t }: Props) {
  const c = t.pages.aDomicilio.content.steps

  return (
    <section className="bg-bone-alt py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <RevealText as="h2" text={c.headline} className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-5 max-w-sm" />
          <p className="font-sans text-base text-ink/65 leading-relaxed max-w-md mb-14">
            {c.intro}
          </p>
        </RevealOnScroll>

        <div className="relative max-w-2xl">
          {/* Timeline spine — decorative, so hidden from the accessibility tree */}
          <div
            className="absolute left-[17px] top-3 bottom-10 w-px bg-[var(--line)]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-9">
            {c.items.map((step, i) => {
              const isLast = i === c.items.length - 1
              return (
                <RevealOnScroll key={step.number} delay={i * 80}>
                  <div className="flex gap-5">
                    <div
                      className={[
                        'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10',
                        isLast ? 'bg-teal' : 'bg-bone-alt border border-ink/25',
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

                    <div className="pb-1">
                      <h3 className="font-fraunces text-xl text-ink mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm md:text-base text-ink/65 leading-relaxed max-w-md">
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
