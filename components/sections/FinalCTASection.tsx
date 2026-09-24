import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { WaveMark } from '@/components/ui/WaveMark'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function FinalCTASection({ t }: Props) {
  return (
    <section className="bg-navy py-24 section-px flex flex-col items-center text-center">
      <RevealOnScroll>
        <WaveMark size="md" className="mx-auto mb-8 [&_path]:stroke-bone/30" />
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <h2 className="font-fraunces text-4xl md:text-5xl text-bone leading-tight mb-8 whitespace-pre-line max-w-lg mx-auto">
          {t.finalCta.headline}
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <a
          href={waLink(t.finalCta.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-5 bg-teal text-white font-sans font-semibold text-base tracking-wide rounded-full hover:bg-teal/90 transition-colors"
        >
          <WhatsAppIcon size={20} />
          {t.finalCta.cta}
        </a>
      </RevealOnScroll>
    </section>
  )
}
