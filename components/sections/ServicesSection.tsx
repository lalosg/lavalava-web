import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

const serviceIcons = [
  /* Washing machine / kilo */
  <svg key="kilo" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3"/>
    <circle cx="12" cy="13" r="4"/>
    <path d="M6 7h2"/>
  </svg>,
  /* Hanger — tintorería */
  <svg key="dry" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.38 18H3.62a1 1 0 01-.7-1.71L12 8l9.08 8.29a1 1 0 01-.7 1.71z"/>
    <path d="M12 8V5a2 2 0 10-2.45-1.94"/>
  </svg>,
  /* Iron — lavado y planchado */
  <svg key="iron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 17H2a1 1 0 01-1-1v-2a9 9 0 019-9h12l-3 12H5z"/>
    <path d="M8 17v2M12 17v2M16 17v2"/>
  </svg>,
  /* Sparkle — delicados */
  <svg key="delicate" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>,
  /* Pillow — cobertores */
  <svg key="blanket" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="10" rx="4"/>
    <path d="M2 12h20"/>
  </svg>,
  /* Shoe — tenis */
  <svg key="shoe" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 17l1.5-5L8 10l4-5 5.5 3L22 17H2z"/>
    <path d="M8 10l1 7M12 8l1.5 9"/>
  </svg>,
]

export function ServicesSection({ t }: Props) {
  const regularServices = t.services.items.slice(0, 6)
  const deliveryService = t.services.items[6]

  return (
    <section className="bg-bone py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-12 whitespace-pre-line max-w-sm">
            {t.services.headline}
          </h2>
        </RevealOnScroll>

        {/* 2-col service grid with hairline borders */}
        <RevealOnScroll>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'rgba(27,37,54,0.1)',
              border: '1px solid rgba(27,37,54,0.1)',
            }}
          >
            {regularServices.map((item, i) => (
              <div
                key={item.title}
                className="bg-bone p-6 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-ink/40 flex-shrink-0">
                  {serviceIcons[i]}
                </div>
                <div>
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="font-fraunces text-base text-ink leading-snug">{item.title}</h3>
                    {item.badge && (
                      <span className="flex-shrink-0 text-[10px] font-sans font-semibold tracking-eyebrow text-teal uppercase mt-0.5">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-ink/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* A domicilio — featured full-width navy card */}
        {deliveryService && (
          <RevealOnScroll delay={100}>
            <div className="mt-px bg-navy p-6 flex items-center gap-4 border border-navy">
              <div className="w-10 h-10 rounded-full border border-sand/40 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4D8C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-fraunces text-base text-bone">{deliveryService.title}</h3>
                  {deliveryService.badge && (
                    <span className="text-[10px] font-sans font-semibold tracking-eyebrow text-teal uppercase">
                      {deliveryService.badge}
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-bone/50 leading-relaxed">{deliveryService.description}</p>
              </div>
            </div>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={150}>
          <p className="mt-8 font-sans text-xs text-ink/40 hover:text-ink/60 transition-colors cursor-default">
            {t.services.cta}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
