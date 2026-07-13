import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

const pillarIcons = [
  /* Eye — cuidado visible */
  <svg key="eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E7F84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>,
  /* Sparkle — sin complicaciones */
  <svg key="spark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E7F84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>,
  /* Clock — puntualidad */
  <svg key="clock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E7F84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>,
]

interface Props {
  t: Translations
}

export function PillarsSection({ t }: Props) {
  return (
    <section className="bg-bone-alt py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-12">{t.pillars.eyebrow}</p>
        </RevealOnScroll>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {t.pillars.items.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 100}>
              <div className="flex gap-5 items-start lg:flex-col lg:gap-4 lg:flex-1">
                <div className="flex-shrink-0 w-[38px] h-[38px] rounded-full border border-[#5E7F84] flex items-center justify-center">
                  {pillarIcons[i]}
                </div>
                <div>
                  <h3 className="font-fraunces text-xl text-ink mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-ink/55 leading-relaxed max-w-xs">
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
