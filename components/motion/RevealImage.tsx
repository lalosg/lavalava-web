'use client'

import { cn } from '@/lib/utils'
import { useInView } from './useInView'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * A clip-path wipe from the bottom edge, with the image settling from 1.06 to 1.
 *
 * The scale is what makes it read as lifting a cloth off something rather than a
 * box growing: the frame is completely filled at every moment of the wipe, so no
 * container ever shows through. Both properties are compositor-driven, so this
 * costs no layout and no paint.
 *
 * The wrapper carries no size of its own — it inherits the aspect-ratio box the
 * caller already established, which is what keeps CLS at zero.
 */
export function RevealImage({ children, className, delay = 0 }: Props) {
  const { ref, visible } = useInView({ delay })

  return (
    <div ref={ref} className={cn('reveal-image h-full w-full', visible && 'is-visible', className)}>
      <div className="reveal-image__inner">{children}</div>
    </div>
  )
}
