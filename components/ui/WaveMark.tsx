import { cn } from '@/lib/utils'

interface Props {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  /** Draw the stroke on in place of the idle oscillation — used on first paint. */
  draw?: boolean
}

/**
 * Length of the wave path in user units. Measured with getTotalLength() against the
 * exact `d` below — 51.4448, rounded up to 52 so the dash fully covers the stroke.
 * Feeding the real number to stroke-dasharray means the draw starts empty and ends
 * closed with no seam at either end; an estimate leaves a visible stub or a jump.
 * If the path data changes, re-measure — do not guess.
 */
const WAVE_PATH_LENGTH = 52

const sizes = {
  sm: { width: 36,  height: 12, strokeWidth: 1.2 },
  md: { width: 52,  height: 18, strokeWidth: 1.5 },
  lg: { width: 72,  height: 24, strokeWidth: 1.8 },
}

export function WaveMark({ className, size = 'md', draw = false }: Props) {
  const { width, height, strokeWidth } = sizes[size]
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(draw ? 'wave-draw' : 'animate-wave', className)}
      style={draw ? ({ '--wave-len': WAVE_PATH_LENGTH } as React.CSSProperties) : undefined}
    >
      <path
        d="M2 9 C9 2, 17 16, 26 9 C35 2, 43 16, 50 9"
        stroke="var(--teal)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
