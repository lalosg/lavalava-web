import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function FinalCTASection({ t }: Props) {
  return (
    <section data-final-cta className="bg-navy py-24 section-px flex flex-col items-center text-center">
      <RevealOnScroll>
        <RevealText as="h2" text={t.finalCta.headline} className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-8 max-w-lg mx-auto" />
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <a
          href={waLink(t.finalCta.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-5 bg-teal-deep text-white font-sans font-semibold text-base tracking-wide rounded-full hover:bg-teal-deep/90 press"
        >
          <WhatsAppIcon size={20} />
          {t.finalCta.cta}
        </a>
      </RevealOnScroll>
    </section>
  )
}
