'use client'

import { useState } from 'react'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--line)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-fraunces text-base text-ink leading-snug pr-2">{q}</span>
        <span
          className={[
            'flex-shrink-0 w-6 h-6 rounded-full border border-[var(--line)] flex items-center justify-center mt-0.5 transition-transform duration-200',
            open ? 'rotate-45' : '',
          ].join(' ')}
          aria-hidden="true"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" stroke="#1B2536" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="1" y1="5" x2="9" y2="5" stroke="#1B2536" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div
        className={[
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-96 pb-5' : 'max-h-0',
        ].join(' ')}
      >
        <p className="font-sans text-sm text-ink/55 leading-relaxed max-w-xl">{a}</p>
      </div>
    </div>
  )
}

export function FAQSection({ t }: Props) {
  return (
    <section className="bg-bone py-20 section-px">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{t.faq.eyebrow}</p>
          <h2 className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-12 whitespace-pre-line max-w-sm">
            {t.faq.headline}
          </h2>
        </RevealOnScroll>

        <div className="max-w-2xl border-t border-[var(--line)]">
          {t.faq.items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
