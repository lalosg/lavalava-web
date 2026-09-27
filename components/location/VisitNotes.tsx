import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function VisitNotes({ t }: Props) {
  const c = t.pages.ubicacion.content.visit

  return (
    <section className="bg-bone py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-14 whitespace-pre-line max-w-sm">
            {c.headline}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {c.items.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 70}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 font-fraunces text-sm text-teal-deep mt-1 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-fraunces text-lg text-ink mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-ink/65 leading-relaxed max-w-sm">
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
