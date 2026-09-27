'use client'

import { cn } from '@/lib/utils'
import { useInView } from './useInView'

interface Props {
  /** Headline copy. Newlines mark the editorial line breaks and become the mask rows. */
  text: string
  className?: string
  /** Renders as this element — headlines should stay h1/h2 for the document outline. */
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
  eager?: boolean
}

/**
 * Headline lines rising out of a mask, staggered.
 *
 * The copy already carries its editorial breaks as \n (the CMS field is single-line;
 * the break is the website's render decision), so lines are split on that rather than
 * measured — no layout thrash, no wrapping guesswork, and identical output on the
 * server and the client.
 *
 * The whole string stays in the DOM as real text inside the heading element, so the
 * document outline, crawlers and copy-paste are all unaffected. Only transform moves.
 */
export function RevealText({ text, className, as: Tag = 'h2', delay = 0, eager = false }: Props) {
  const { ref, visible } = useInView({ delay, eager })
  const lines = text.split('\n')

  return (
    <Tag className={className}>
      <span ref={ref} className={cn('reveal-text', visible && 'is-visible')}>
        {lines.map((line, i) => (
          <span key={i} className="reveal-text__line">
            <span
              className="reveal-text__inner"
              // Each line follows the one above it by a single stagger step.
              style={{ transitionDelay: `calc(var(--stagger) * ${i})` }}
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
