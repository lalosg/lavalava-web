import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { LazyMap } from '@/components/ui/LazyMap'
import { waLink } from '@/lib/translations'
import { BUSINESS } from '@/lib/seo'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * The address as selectable text, with the map as a complement rather than a substitute.
 *
 * A pin alone is invisible to crawlers and to anyone copying the address into a ride
 * app, so the street, colonia, district, postcode and city are all spelled out — and
 * they come from BUSINESS in lib/seo.ts, the same constants the JSON-LD is built from.
 */
export function AddressBlock({ t }: Props) {
  const c = t.pages.ubicacion.content.address
  const loc = t.location

  return (
    <section className="bg-bone-alt py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <RevealText as="h2" text={c.headline} className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-12 max-w-sm" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <RevealOnScroll>
            <address className="not-italic font-sans text-lg text-ink leading-relaxed mb-6">
              {loc.address}
              <br />
              {loc.city}
            </address>

            <p className="font-sans text-sm text-ink/65 leading-relaxed mb-8 max-w-sm">
              {c.note}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={BUSINESS.sameAs[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-semibold text-teal-deep hover:text-teal-soft transition-colors"
              >
                {c.directions}
              </a>
              <a
                href={waLink(c.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ink/65 hover:text-ink/75 transition-colors"
              >
                {c.whatsappCta}
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <LazyMap ariaLabel={loc.mapLabel} ctaLabel={loc.mapCta} className="max-w-none" />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
