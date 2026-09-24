import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * Native <details>/<summary> — no client JS, and the answer text is in the DOM on
 * first paint whether or not the item is open, which is what crawlers and AI
 * assistants read. An accordion built with useState would hide it behind hydration.
 */
export function DeliveryFaq({ t }: Props) {
  const c = t.pages.aDomicilio.content.faq

  return (
    <section className="bg-bone py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-12 whitespace-pre-line max-w-sm">
            {c.headline}
          </h2>
        </RevealOnScroll>

        <div className="max-w-2xl">
          {c.items.map((item, i) => (
            <RevealOnScroll key={item.q} delay={i * 50}>
              <details className="group border-b border-[var(--line)]">
                <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-fraunces text-lg text-ink leading-snug">{item.q}</h3>
                  <span
                    className="flex-shrink-0 mt-1.5 text-ink/30 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="font-sans text-sm md:text-base text-ink/55 leading-relaxed pb-6 pr-10 max-w-xl">
                  {item.a}
                </p>
              </details>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
