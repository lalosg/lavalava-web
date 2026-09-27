import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { BUSINESS } from '@/lib/seo'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * Leads with proximity rather than the address.
 *
 * For the student segment, "a few minutes from campus" is the whole competitive
 * advantage — they know the Tec as a landmark far better than they know the street.
 */
export function LocationHero({ t }: Props) {
  const c = t.pages.ubicacion.content.hero

  return (
    <section className="bg-bone pt-32 pb-20 md:pt-40 md:pb-24 section-px">
      <div className="max-w-6xl mx-auto">
        {/* eager: above the fold, so it paints with the document rather than waiting
            on the IntersectionObserver. Same reasoning as the homepage hero. */}
        <RevealOnScroll eager>
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-fraunces text-[2.75rem] leading-[1.05] md:text-6xl lg:text-7xl text-ink mb-8 whitespace-pre-line max-w-3xl">
            {c.headline}
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/65 leading-relaxed max-w-xl mb-10">
            {c.lede}
          </p>
        </RevealOnScroll>

        <RevealOnScroll eager delay={120}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={BUSINESS.sameAs[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-teal text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal/90 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2C8.69 2 6 4.69 6 8c0 4.25 6 13 6 13s6-8.75 6-13c0-3.31-2.69-6-6-6Z" />
                <circle cx="12" cy="8" r="2" />
              </svg>
              {c.ctaPrimary}
            </a>
            <a
              href="#horarios"
              className="inline-flex items-center justify-center sm:justify-start font-sans text-sm text-ink/65 hover:text-ink/75 transition-colors"
            >
              {c.ctaSecondary}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
