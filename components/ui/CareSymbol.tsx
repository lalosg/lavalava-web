import { cn } from '@/lib/utils'

/**
 * Real ISO 3758 textile care symbols.
 *
 * These are the marks already printed inside every garment the shop handles — the
 * trade's own writing system, not an illustration of it. They are drawn to the
 * standard rather than stylised: a washtub is a tub with a water line, a circle means
 * professional cleaning, an iron is an iron. Nothing here is invented, because a made
 * up care symbol would be a false instruction about a garment.
 *
 * Consequence worth keeping: there is no ISO symbol for "sneakers", "repairs" or
 * "pickup", so those services get no symbol. The alphabet stops where the standard
 * stops.
 */
export type CareKind = 'wash' | 'dryclean' | 'iron' | 'bleach' | 'dry'

interface Props {
  kind: CareKind
  size?: number
  className?: string
  /** Accessible name. Omit for decorative use alongside a visible label. */
  label?: string
}

export function CareSymbol({ kind, size = 24, className, label }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg
      {...common}
      className={cn('flex-shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {kind === 'wash' && (
        <>
          {/* Tub walls splay outward, and the water line across the top is part of
              the standard mark, not decoration — without it this is just a bucket. */}
          <path d="M2.4 6.8 L4.6 20.4 H19.4 L21.6 6.8" />
          <path d="M2.4 6.8 C5.7 4.2, 8.7 9.4, 12 6.8 C15.3 4.2, 18.3 9.4, 21.6 6.8" />
        </>
      )}
      {kind === 'dryclean' && <circle cx="12" cy="12" r="8.6" />}
      {kind === 'iron' && (
        /* An iron in profile: nose at the lower left, sole flat along the bottom,
           back squared off at the right. Two earlier attempts drew a symmetrical
           mound, which reads as a hill — the asymmetry IS the symbol. */
        <path d="M2.2 18.3 L10.8 9.6 H18.4 C20.2 9.6 21.8 11.1 21.8 12.9 V18.3 Z" />
      )}
      {kind === 'bleach' && <path d="M12 3.9 L20.6 19.3 H3.4 Z" />}
      {kind === 'dry' && (
        <>
          <rect x="3.6" y="4.6" width="16.8" height="14.8" rx="0.8" />
          <circle cx="12" cy="12" r="4.6" />
        </>
      )}
    </svg>
  )
}
