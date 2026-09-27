import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function ServicesHero({ t }: Props) {
  const c = t.pages.servicios.content.hero

  return (
    <section className="bg-bone pt-32 pb-20 md:pt-40 md:pb-24 section-px">
      <div className="max-w-6xl mx-auto">
        {/* eager: above the fold, so it paints with the document rather than waiting
            on the IntersectionObserver. Same reasoning as the homepage hero. */}
        <RevealOnScroll eager>
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <RevealText as="h1" eager text={c.headline} className="font-fraunces text-[2.75rem] leading-[1.05] md:text-6xl lg:text-7xl text-ink mb-8 max-w-3xl" />
          <p className="font-sans text-base md:text-lg text-ink/65 leading-relaxed max-w-xl mb-10">
            {c.lede}
          </p>
        </RevealOnScroll>

        <RevealOnScroll eager delay={120}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={waLink(c.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-teal text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal/90 transition-colors"
            >
              <WhatsAppIcon size={17} />
              {c.ctaPrimary}
            </a>
            <a
              href="#catalogo"
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
