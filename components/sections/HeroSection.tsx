import { WaveMark } from '@/components/ui/WaveMark'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" flexShrink-0="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface Props {
  t: Translations
  locale: string
}

export function HeroSection({ t, locale }: Props) {
  return (
    <section className="bg-bone-alt pt-16 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:flex-row">

        {/* Image — full width on mobile, right half on desktop */}
        <div className="order-first lg:order-last lg:flex-1 lg:self-stretch">
          <div className="mx-8 mt-8 lg:mx-0 lg:mt-0 lg:h-full aspect-square lg:aspect-auto
                          bg-[repeating-linear-gradient(135deg,rgba(27,37,54,0.05)_0px,rgba(27,37,54,0.05)_2px,transparent_2px,transparent_16px)]
                          border border-[var(--line)] flex items-center justify-center lg:rounded-none">
            <span className="text-xs text-ink/30 font-sans tracking-eyebrow uppercase">
              FOTO — lino y luz natural
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:py-20 lg:pr-16 max-w-2xl">
          <RevealOnScroll eager>
            <WaveMark size="md" className="mb-8" />
          </RevealOnScroll>

          <RevealOnScroll eager delay={80}>
            <p className="eyebrow mb-5">{t.hero.eyebrow}</p>
          </RevealOnScroll>

          <RevealOnScroll eager delay={160}>
            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.04] tracking-tight mb-6 whitespace-pre-line">
              {t.hero.headline}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll eager delay={240}>
            <p className="font-sans text-base md:text-lg text-ink/55 leading-relaxed mb-10 max-w-sm">
              {t.hero.subhead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll eager delay={320}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(t.hero.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-teal text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal/90 transition-colors"
              >
                <WhatsAppIcon />
                {t.hero.ctaPrimary}
              </a>
              <a
                href={`/${locale}/ubicacion`}
                className="inline-flex items-center justify-center px-7 py-4 border border-[var(--line)] text-ink font-sans font-medium text-sm rounded-full hover:border-ink/30 transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
