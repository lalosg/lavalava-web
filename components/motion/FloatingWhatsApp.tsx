'use client'

import { useEffect, useState } from 'react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  label: string
}

/**
 * Persistent WhatsApp affordance, bottom-right.
 *
 * Appears once the hero's own buttons have scrolled away, and steps aside again when
 * the final CTA is on screen — two calls to action competing in the same viewport is
 * worse than one. Both conditions are observed rather than computed from scroll
 * offsets, so they stay correct whatever the page length.
 *
 * 56px minimum touch target, and the bottom offset respects the iOS home indicator.
 */
export function FloatingWhatsApp({ href, label }: Props) {
  const [visible, setVisible] = useState(false)
  const [pulsed, setPulsed] = useState(false)

  useEffect(() => {
    const heroCta = document.querySelector('[data-hero-cta]')
    const finalCta = document.querySelector('[data-final-cta]')

    let heroGone = false
    let finalHere = false
    const sync = () => setVisible(heroGone && !finalHere)

    const observers: IntersectionObserver[] = []

    if (heroCta) {
      const o = new IntersectionObserver(([e]) => {
        heroGone = !e.isIntersecting
        sync()
      })
      o.observe(heroCta)
      observers.push(o)
    } else {
      // No hero CTA on this page (the spokes): show as soon as the reader moves.
      heroGone = true
    }

    if (finalCta) {
      const o = new IntersectionObserver(([e]) => {
        finalHere = e.isIntersecting
        sync()
      })
      o.observe(finalCta)
      observers.push(o)
    }

    sync()
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    if (!visible || pulsed) return
    // One gentle pulse the first time it arrives, then never again.
    const id = setTimeout(() => setPulsed(true), 1200)
    return () => clearTimeout(id)
  }, [visible, pulsed])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      // aria-hidden while off screen so it is not reachable by a screen reader or
      // the tab order while it is invisible and non-interactive.
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'fixed right-4 z-40 grid place-items-center',
        'h-14 w-14 rounded-full bg-navy text-white shadow-lg shadow-navy/25',
        'transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease)]',
        'hover:bg-navy/90 press',
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3',
        !pulsed && visible && 'fab-pulse',
      )}
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <WhatsAppIcon size={26} />
    </a>
  )
}
