import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { localePath } from '@/lib/translations'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

/**
 * Spoke-to-spoke links, closing the hub-and-spoke loop.
 *
 * Plain <a>, not next/link — deliberately. Importing Link into a server component
 * pulls the client router into the route bundle and measured +9 kB First Load JS on
 * the homepage. Crawlers only read the href, so the SEO value is identical.
 */
export function DeliveryCrossLinks({ t, locale }: Props) {
  const c = t.pages.aDomicilio.content.crossLinks
  const cards = [
    { ...c.services, href: localePath(locale, '/servicios') },
    { ...c.location, href: localePath(locale, '/ubicacion') },
  ]

  return (
    <section className="bg-bone-alt py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-8">{c.eyebrow}</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.href} delay={i * 80}>
              <a
                href={card.href}
                className="group block h-full border border-[var(--line)] bg-bone px-7 py-8 hover:border-ink/25 transition-colors"
              >
                <h2 className="font-fraunces text-2xl text-ink mb-2.5 leading-snug">
                  {card.title}
                </h2>
                <p className="font-sans text-sm text-ink/55 leading-relaxed mb-5 max-w-sm">
                  {card.description}
                </p>
                <span className="font-sans text-sm font-semibold text-teal group-hover:text-teal/75 transition-colors">
                  {card.cta}
                </span>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
