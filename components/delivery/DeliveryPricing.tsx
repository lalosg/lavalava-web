import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PriceTag } from '@/components/ui/PriceTag'
import { waLink } from '@/lib/translations'
import { itemsFor, SERVICE_SLUGS } from '@/lib/prices'
import { activePromo } from '@/lib/contract'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

/**
 * What the trip costs.
 *
 * The figures come from the published POS catalog, never from copy — a price typed into
 * a page goes stale the moment the till changes and becomes an argument at the counter.
 * Pickup and delivery are two separate paid items ($37.50 each, currently promoted to
 * $30), which is why this page no longer claims the service is free.
 *
 * No round-trip price is shown: the POS publishes the two legs and no bundled product,
 * so quoting a combined figure would be inventing one. The round-trip card sends the
 * question to WhatsApp instead.
 */
export function DeliveryPricing({ t, locale }: Props) {
  const c = t.pages.aDomicilio.content.pricing
  const items = itemsFor(SERVICE_SLUGS.delivery)
  const hasPromo = items.some((item) => activePromo(item))

  return (
    <section className="bg-bone-alt py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-5 whitespace-pre-line max-w-sm">
            {c.headline}
          </h2>
          <p className="font-sans text-base text-ink/65 leading-relaxed max-w-xl mb-12">
            {c.intro}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {items.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 80}>
              <div className="h-full border border-[var(--line)] bg-bone px-7 py-7 flex flex-col justify-between gap-5">
                <h3 className="font-fraunces text-xl text-ink leading-snug">
                  {item.name[locale]}
                </h3>
                <PriceTag item={item} wasLabel={c.wasLabel} size="lg" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {hasPromo && (
          <RevealOnScroll delay={120}>
            <p className="mt-5 font-sans text-xs text-[#2F6B4F] font-semibold">
              {c.promoNote}
            </p>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={160}>
          <div className="mt-10 max-w-xl border-t border-[var(--line)] pt-8">
            <h3 className="font-fraunces text-lg text-ink mb-2">{c.roundTrip.title}</h3>
            <p className="font-sans text-sm text-ink/65 leading-relaxed mb-4">
              {c.roundTrip.text}
            </p>
            <a
              href={waLink(t.pages.aDomicilio.content.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-sans text-sm font-semibold text-teal-deep hover:text-teal-soft transition-colors"
            >
              {t.pages.aDomicilio.content.hero.ctaPrimary} →
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="mt-8 font-sans text-xs text-ink/65 leading-relaxed max-w-xl">
            {c.disclaimer}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
