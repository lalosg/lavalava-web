'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getT, localePath } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
}

/** Past this many pixels the header is considered "off the hero". */
const SOLID_AFTER = 24

export function Header({ locale }: Props) {
  const t = getT(locale)
  // Only the homepage has a full-bleed photographic hero for the bar to float over.
  // The spokes open on bone, where a transparent header would simply be invisible.
  const pathname = usePathname()
  const overHero = pathname === `/${locale}` || pathname === `/${locale}/`

  const [solid, setSolid] = useState(!overHero)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // The bar never hides. An earlier version slid it away on scroll-down and brought it
  // back on scroll-up; on a phone that reads as the navigation disappearing, and with
  // the menu now living up here it would take the only route to the sub-pages with it.
  useEffect(() => {
    let frame = 0
    const read = () => {
      setSolid(!overHero || window.scrollY > SOLID_AFTER)
      frame = 0
    }
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

  // Close the menu on route change, on Escape, and on a tap outside it.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onPointer = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const nav = [
    { label: t.nav.services, href: localePath(locale, '/servicios') },
    { label: t.nav.delivery, href: localePath(locale, '/a-domicilio') },
    { label: t.nav.location, href: localePath(locale, '/ubicacion') },
  ]

  const linkBase = 'transition-colors duration-300'
  // Once the menu is open it sits on a bone panel, so the bar has to read as solid
  // even if the reader is still at the very top of the hero.
  const onPhoto = !solid && !open

  return (
    <header
      ref={panelRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background-color,border-color,backdrop-filter] duration-500 [transition-timing-function:var(--ease)]',
        solid || open
          ? 'bg-bone/95 backdrop-blur-md border-b border-[var(--line)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center group">
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-semibold tracking-eyebrow">
            {(['es', 'en'] as const).map((code, i) => (
              <span key={code} className="flex items-center">
                {i > 0 && (
                  <span className={cn('mx-1', linkBase, onPhoto ? 'text-white/60' : 'text-ink/65')}>
                    ·
                  </span>
                )}
                <Link
                  href={`/${code}`}
                  className={cn(
                    'tap',
                    linkBase,
                    onPhoto
                      ? locale === code
                        ? 'text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                        : 'text-white/75 hover:text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]'
                      : locale === code
                        ? 'text-ink'
                        : 'text-ink/65 hover:text-ink/90',
                  )}
                >
                  {code.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          {/* Hamburger — mobile only, since md+ already shows the full nav */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className={cn(
              'md:hidden -mr-2 grid place-items-center h-11 w-11 rounded-full',
              linkBase,
              onPhoto ? 'text-white' : 'text-ink',
            )}
          >
            {/* Two bars that cross into an X — no icon library, no extra bytes */}
            <span className="relative block h-[14px] w-[22px]" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 h-[1.5px] w-full bg-current rounded-full',
                  'transition-transform duration-300 [transition-timing-function:var(--ease)]',
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-[1.5px] w-full bg-current rounded-full',
                  'transition-transform duration-300 [transition-timing-function:var(--ease)]',
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Dropdown panel. Rendered always so the links are in the DOM for crawlers;
          collapsed with max-height + visibility so it is inert when closed. */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden overflow-hidden border-t',
          'transition-[max-height,opacity] duration-500 [transition-timing-function:var(--ease)]',
          open
            ? 'max-h-80 opacity-100 border-[var(--line)]'
            : 'max-h-0 opacity-0 border-transparent invisible',
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 py-2 flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? undefined : -1}
              className="font-fraunces text-xl text-ink py-3.5 border-b border-[var(--line)] last:border-b-0 hover:text-ink/70 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
