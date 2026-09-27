import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ArrowLabel } from '@/components/ui/ArrowLabel'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * The catch-all for what the price list does not cover.
 *
 * This exists for AEO as much as for the customer: "do they do X" is the query shape
 * that sends someone to a competitor, and a page that says "ask us, here is how"
 * answers it better than a list that simply omits X.
 */
export function UnusualSection({ t }: Props) {
  const c = t.pages.servicios.content.unusual

  return (
    <section className="bg-bone py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-6 max-w-sm">
            {c.headline}
          </h2>
          <p className="font-sans text-base md:text-lg text-ink/65 leading-relaxed max-w-2xl mb-8">
            {c.body}
          </p>
          <a
            href={waLink(c.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-sans text-sm font-semibold text-teal-deep hover:text-teal-soft transition-colors"
          >
            <WhatsAppIcon size={15} />
            <ArrowLabel>{c.cta}</ArrowLabel>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
