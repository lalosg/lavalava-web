import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { waLink } from '@/lib/translations'
import { COVERAGE_AREAS } from '@/lib/coverage'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * The 24 colonias, as real text.
 *
 * This is the page's reason to exist. Every name here is a phrase somebody types into
 * Google or an AI assistant, and rendering them as selectable text — not baked into a
 * map tile or an image — is what makes them citable. The same COVERAGE_AREAS array
 * feeds deliveryServiceSchema()'s areaServed in the same render pass, so the visible
 * list and the structured data cannot drift apart.
 */
export function CoverageGrid({ t }: Props) {
  const c = t.pages.aDomicilio.content.coverage
  const featured = COVERAGE_AREAS.filter((a) => a.featured)
  const rest = COVERAGE_AREAS.filter((a) => !a.featured)

  return (
    <section id="cobertura" className="bg-bone py-20 md:py-24 section-px scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{c.eyebrow}</p>
          <RevealText as="h2" text={c.headline} className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-5 max-w-lg" />
          <p className="font-sans text-base text-ink/65 leading-relaxed max-w-xl mb-12">
            {c.intro}
          </p>
        </RevealOnScroll>

        {/* Featured — the densest pockets of the target customer */}
        <RevealOnScroll delay={60}>
          <h3 className="eyebrow mb-5 text-ink/65">{c.featuredLabel}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14">
            {featured.map((area) => (
              <li
                key={area.name}
                className="border border-[var(--line)] bg-sand/25 px-5 py-6 flex items-center"
              >
                <span className="font-fraunces text-lg md:text-xl text-ink leading-snug">
                  {area.name}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* The full list */}
        <RevealOnScroll delay={100}>
          <h3 className="eyebrow mb-5 text-ink/65">{c.allLabel}</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
            {rest.map((area) => (
              <li
                key={area.name}
                className="font-sans text-sm md:text-base text-ink/70 py-3 border-b border-[var(--line)]"
              >
                {area.name}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Outside the polygon — still worth a message */}
        <RevealOnScroll delay={140}>
          <div className="mt-12 max-w-xl">
            <p className="font-sans text-sm text-ink/65 leading-relaxed mb-3">
              {c.notListed.text}
            </p>
            <a
              href={waLink(c.notListed.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-sans text-sm font-semibold text-teal-deep hover:text-teal-soft transition-colors"
            >
              {c.notListed.cta}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
