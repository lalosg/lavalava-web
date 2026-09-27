'use client'

import { useCallback, useState } from 'react'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { ScrollWave } from '@/components/motion/ScrollWave'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function HowItWorksSection({ t }: Props) {
  const steps = t.howItWorks.steps
  const [active, setActive] = useState(0)
  // Stable identity so ScrollWave's effect is not torn down on every render.
  const handleProgress = useCallback((n: number) => setActive(n), [])

  return (
    <section className="bg-bone-alt py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.howItWorks.eyebrow}</p>
          <RevealText
            as="h2"
            text={t.howItWorks.headline}
            className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-14 max-w-sm"
          />
        </RevealOnScroll>

        <div className="relative max-w-lg pl-1">
          {/* The straight hairline is replaced by a wave that draws with scroll —
              the same curve as the mark, turned on its side. */}
          <ScrollWave steps={steps.length} onProgress={handleProgress} />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => {
              const lit = i < active
              return (
                <RevealOnScroll key={step.number} delay={i * 80}>
                  <div className="flex gap-5 relative">
                    <div
                      className={[
                        'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10',
                        'transition-colors duration-700 [transition-timing-function:var(--ease)]',
                        lit ? 'bg-navy border border-navy' : 'bg-bone-alt border border-ink/25',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'font-fraunces text-sm transition-colors duration-700',
                          lit ? 'text-bone' : 'text-ink',
                        ].join(' ')}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="pb-2">
                      <h3 className="font-fraunces text-lg text-ink mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-ink/65 leading-relaxed max-w-xs">
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
