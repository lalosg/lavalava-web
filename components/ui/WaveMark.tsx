import { cn } from '@/lib/utils'

interface Props {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { width: 36,  height: 12, strokeWidth: 1.2 },
  md: { width: 52,  height: 18, strokeWidth: 1.5 },
  lg: { width: 72,  height: 24, strokeWidth: 1.8 },
}

export function WaveMark({ className, size = 'md' }: Props) {
  const { width, height, strokeWidth } = sizes[size]
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('animate-wave', className)}
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
