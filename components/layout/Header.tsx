'use client'

import Link from 'next/link'
import { WaveMark } from '@/components/ui/WaveMark'
import { getT, localePath } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
}

export function Header({ locale }: Props) {
  const t = getT(locale)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bone/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <WaveMark size="sm" />
          <span className="font-fraunces text-lg font-semibold tracking-[0.08em] text-ink">
            LAVALAVA
          </span>
        </Link>

        {/* Nav links — hidden on mobile, shown md+ */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t.nav.services, href: localePath(locale, '/servicios') },
            { label: t.nav.delivery, href: localePath(locale, '/a-domicilio') },
            { label: t.nav.location, href: localePath(locale, '/ubicacion') },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs font-medium tracking-eyebrow uppercase text-ink/45 hover:text-ink/80 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: language toggle */}
        <div className="flex items-center gap-1 text-xs font-semibold tracking-eyebrow">
          <Link
            href="/es"
            className={locale === 'es' ? 'text-ink' : 'text-ink/35 hover:text-ink/60 transition-colors'}
          >
            ES
          </Link>
          <span className="text-ink/20 mx-1">·</span>
          <Link
            href="/en"
            className={locale === 'en' ? 'text-ink' : 'text-ink/35 hover:text-ink/60 transition-colors'}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  )
}
