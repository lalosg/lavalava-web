import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface Card {
  title: string
  description: string
  cta: string
  href: string
}

interface Props {
  eyebrow: string
  cards: Card[]
}

/**
 * Spoke-to-spoke links, closing the hub-and-spoke loop.
 *
 * Plain <a>, not next/link — deliberately. Importing Link into a server component pulls
 * the client router into the route bundle and measured +9 kB First Load JS on the
 * homepage. Crawlers only read the href, so the SEO value is identical.
 */
export function SpokeCrossLinks({ eyebrow, cards }: Props) {
  return (
    <section className="bg-bone-alt py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-8">{eyebrow}</p>
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
                <p className="font-sans text-sm text-ink/65 leading-relaxed mb-5 max-w-sm">
                  {card.description}
                </p>
                <span className="font-sans text-sm font-semibold text-teal-deep group-hover:text-teal-soft transition-colors">
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
