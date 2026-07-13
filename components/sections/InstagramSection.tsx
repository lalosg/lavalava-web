import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { InstagramFeed } from '@/components/ui/InstagramFeed'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

// TODO: Set INSTAGRAM_WIDGET_ID once Behold.so account is created
// 1. Go to behold.so → create free account → connect @lavalava.vip
// 2. Create a new widget → copy the Widget ID
// 3. Set it here (or in an env var: process.env.NEXT_PUBLIC_BEHOLD_WIDGET_ID)
const INSTAGRAM_WIDGET_ID: string | undefined = undefined

export function InstagramSection({ t }: Props) {
  return (
    <section className="bg-bone py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.instagram.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-4 whitespace-pre-line max-w-sm">
            {t.instagram.headline}
          </h2>
          <p className="font-sans text-sm text-ink/50 mb-10">{t.instagram.description}</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mb-8">
            <InstagramFeed widgetId={INSTAGRAM_WIDGET_ID} />
          </div>
        </RevealOnScroll>

        {/* Follow CTA */}
        <RevealOnScroll delay={80}>
          <div className="flex items-center gap-3 bg-sand px-5 py-4 inline-flex">
            <div className="w-8 h-8 rounded-full border border-[#5E7F84] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E7F84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#5E7F84" stroke="none"/>
              </svg>
            </div>
            <a
              href="https://instagram.com/lavalava.vip"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold text-ink hover:text-ink/70 transition-colors"
            >
              {t.instagram.cta}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
