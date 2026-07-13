'use client'

import Link from 'next/link'
import { WaveMark } from '@/components/ui/WaveMark'

interface Props {
  locale: string
}

export function Header({ locale }: Props) {
  const isEs = locale === 'es'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bone/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link href={`/${isEs ? '' : 'en'}`} className="flex items-center gap-3">
          <WaveMark size="sm" />
          <span className="font-fraunces text-lg font-semibold tracking-[0.08em] text-ink">
            LAVALAVA
          </span>
        </Link>

        {/* Language toggle */}
        <div className="flex items-center gap-1 text-xs font-semibold tracking-eyebrow">
          <Link
            href="/"
            className={isEs ? 'text-ink' : 'text-ink/35 hover:text-ink/60 transition-colors'}
          >
            ES
          </Link>
          <span className="text-ink/20 mx-1">·</span>
          <Link
            href="/en"
            className={!isEs ? 'text-ink' : 'text-ink/35 hover:text-ink/60 transition-colors'}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  )
}
