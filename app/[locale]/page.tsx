import type { Locale } from '@/lib/i18n'
import { getT, waLink } from '@/lib/translations'
import { WaveMark } from '@/components/ui/WaveMark'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface Props {
  params: { locale: Locale }
}

export default function HomePage({ params }: Props) {
  const t = getT(params.locale)
  const locale = params.locale

  return (
    <>
      {/* ── HERO (placeholder — Step 3 will replace with full cinematic version) ── */}
      <section className="min-h-screen flex items-center justify-center bg-bone pt-16">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <RevealOnScroll eager>
            <WaveMark size="lg" className="mx-auto mb-10" />
          </RevealOnScroll>

          <RevealOnScroll eager delay={120}>
            <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
          </RevealOnScroll>

          <RevealOnScroll eager delay={200}>
            <h1 className="font-fraunces text-5xl md:text-7xl text-ink leading-[1.05] tracking-tight mb-8 whitespace-pre-line">
              {t.hero.headline}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll eager delay={300}>
            <p className="font-sans text-lg text-ink/55 leading-relaxed mb-12 max-w-md mx-auto">
              {t.hero.subhead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll eager delay={380}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink(t.hero.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal/90 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.hero.ctaPrimary}
              </a>
              <a
                href={`/${locale}/ubicacion`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--line)] text-ink font-sans font-medium text-sm tracking-wide rounded-full hover:border-ink/30 transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── DESIGN SYSTEM VERIFICATION (remove in Step 3) ── */}
      <section className="py-24 px-6 bg-bone-alt">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-8">Design system — token verification</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
            {[
              { name: 'bone', bg: 'bg-bone border border-[var(--line)]' },
              { name: 'bone-alt', bg: 'bg-bone-alt border border-[var(--line)]' },
              { name: 'ink', bg: 'bg-ink' },
              { name: 'navy', bg: 'bg-navy' },
              { name: 'sand', bg: 'bg-sand' },
              { name: 'teal', bg: 'bg-teal' },
            ].map(({ name, bg }) => (
              <div key={name} className="flex flex-col gap-2">
                <div className={`h-12 rounded-lg ${bg}`} />
                <span className="text-xs text-ink/50 font-sans">{name}</span>
              </div>
            ))}
          </div>
          <h2 className="font-fraunces text-4xl text-ink mb-4">Fraunces — heading face</h2>
          <p className="font-sans text-base text-ink/60 leading-relaxed">
            Source Sans 3 — body text. The quick brown fox jumps over the lazy dog.
            <br />
            <strong className="font-semibold text-ink">Semibold variant.</strong>{' '}
            <span className="text-teal">Teal accent.</span>
          </p>
        </div>
      </section>
    </>
  )
}
