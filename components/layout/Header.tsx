'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WaveMark } from '@/components/ui/WaveMark'
import { getT, localePath } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
}

/** Past this many pixels the header is considered "off the hero". */
const SOLID_AFTER = 24
/** Ignore scroll jitter below this, so the bar does not flicker on a trackpad. */
const DIRECTION_THRESHOLD = 6
/** Never hide the bar until the reader is genuinely into the page. */
const HIDE_AFTER = 240

export function Header({ locale }: Props) {
  const t = getT(locale)
  // Only the homepage has a full-bleed photographic hero for the bar to float over.
  // The spokes open on bone, where a transparent header would simply be invisible.
  // Derived from the path rather than passed down, because the layout renders above
  // the page segment and cannot know which route is being served.
  const pathname = usePathname()
  const overHero = pathname === `/${locale}` || pathname === `/${locale}/`
  const [solid, setSolid] = useState(!overHero)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0

    const read = () => {
      const y = window.scrollY
      setSolid(!overHero || y > SOLID_AFTER)

      const delta = y - last
      if (Math.abs(delta) > DIRECTION_THRESHOLD) {
        // Hide going down, return going up — but never while near the top, where
        // hiding would just look like the bar falling off the page.
        setHidden(delta > 0 && y > HIDE_AFTER)
        last = y
      }
      frame = 0
    }

    // Read on a frame rather than on every scroll event: the handler only ever
    // sets state, and coalescing keeps it off the scroll critical path.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [overHero])

  const linkBase = 'transition-colors duration-300'
  const onPhoto = !solid

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-[transform,background-color,border-color,backdrop-filter] duration-500 [transition-timing-function:var(--ease)]',
        hidden ? '-translate-y-full' : 'translate-y-0',
        solid
          ? 'bg-bone/90 backdrop-blur-md border-b border-[var(--line)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <WaveMark size="sm" className={onPhoto ? '[&_path]:stroke-white' : undefined} />
          <span
            className={cn(
              'font-fraunces text-lg font-semibold tracking-[0.08em]',
              linkBase,
              onPhoto ? 'text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]' : 'text-ink',
            )}
          >
            LAVALAVA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t.nav.services, href: localePath(locale, '/servicios') },
            { label: t.nav.delivery, href: localePath(locale, '/a-domicilio') },
            { label: t.nav.location, href: localePath(locale, '/ubicacion') },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-sans text-xs font-medium tracking-eyebrow uppercase',
                linkBase,
                onPhoto
                  ? 'text-white/90 hover:text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                  : 'text-ink/65 hover:text-ink/90',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-xs font-semibold tracking-eyebrow">
          <Link
            href="/es"
            className={cn(
              linkBase,
              onPhoto
                ? locale === 'es'
                  ? 'text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                  : 'text-white/75 hover:text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                : locale === 'es'
                  ? 'text-ink'
                  : 'text-ink/65 hover:text-ink/90',
            )}
          >
            ES
          </Link>
          <span className={cn('mx-1', linkBase, onPhoto ? 'text-white/60' : 'text-ink/65')}>·</span>
          <Link
            href="/en"
            className={cn(
              linkBase,
              onPhoto
                ? locale === 'en'
                  ? 'text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                  : 'text-white/75 hover:text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                : locale === 'en'
                  ? 'text-ink'
                  : 'text-ink/65 hover:text-ink/90',
            )}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  )
}
