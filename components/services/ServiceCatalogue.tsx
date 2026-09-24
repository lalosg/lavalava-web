import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { PriceTag } from '@/components/ui/PriceTag'
import { itemsFor } from '@/lib/prices'
import { activePromo } from '@/lib/contract'
import type { Translations } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  t: Translations
  locale: Locale
}

/**
 * The seven services, each with its published price list.
 *
 * Copy is authored in lib/translations (the POS descriptions are written in `usted`,
 * while the site speaks `tú` — the voices do not mix). Item NAMES and PRICES come from
 * the published contract via itemsFor(), never from the translation files, because a
 * price typed into a page goes stale the moment the till changes.
 *
 * Order here is editorial, not the POS's `order`: per-kilo leads because it is the
 * volume driver students come back for weekly, and dry cleaning follows because it is
 * where the craft — and the margin — lives.
 */
export function ServiceCatalogue({ t, locale }: Props) {
  const c = t.pages.servicios.content.catalogue

  return (
    <section id="catalogo" className="bg-bone-alt py-20 md:py-24 section-px scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-5 max-w-sm">
            {c.headline}
          </h2>
          <p className="font-sans text-base text-ink/55 leading-relaxed max-w-xl mb-16">
            {c.intro}
          </p>
        </RevealOnScroll>

        <div className="flex flex-col">
          {c.items.map((service, i) => {
            const items = itemsFor(service.slug)
            const hasPromo = items.some((item) => activePromo(item))

            return (
              <RevealOnScroll key={service.slug} delay={40}>
                <article
                  className={[
                    'grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 py-12',
                    i === 0 ? 'border-t' : '',
                    'border-b border-[var(--line)]',
                  ].join(' ')}
                >
                  {/* Copy */}
                  <div className="max-w-xl">
                    <p className="eyebrow mb-3">{service.tagline}</p>
                    <h3 className="font-fraunces text-2xl md:text-3xl text-ink leading-snug mb-4">
                      {service.name}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-ink/60 leading-relaxed mb-4">
                      {service.body}
                    </p>
                    <p className="font-sans text-sm text-ink/45 leading-relaxed mb-6">
                      {service.detail}
                    </p>
                    <p className="font-sans text-xs text-ink/40">
                      <span className="uppercase tracking-eyebrow">{c.turnaroundLabel}</span>
                      <span className="mx-2 text-ink/20">·</span>
                      <span className="text-ink/70 font-semibold">{service.turnaround}</span>
                    </p>
                  </div>

                  {/* Published prices */}
                  {items.length > 0 && (
                    <div className="lg:min-w-[19rem]">
                      <ul className="flex flex-col">
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-baseline justify-between gap-6 py-2.5 border-b border-[var(--line)] last:border-b-0"
                          >
                            <span className="font-sans text-sm text-ink/70">
                              {item.name[locale]}
                            </span>
                            <PriceTag item={item} wasLabel={c.wasLabel} />
                          </li>
                        ))}
                      </ul>
                      {hasPromo && (
                        <p className="mt-3 font-sans text-xs font-semibold text-[#2F6B4F]">
                          {c.promoLabel}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
