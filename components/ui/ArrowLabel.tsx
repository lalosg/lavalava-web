interface Props {
  /** CTA copy that may end with a trailing arrow, e.g. "Ver servicios →" */
  children: string
}

/**
 * Splits a trailing arrow off a CTA label so it can move on hover.
 *
 * The arrow lives in the copy (the CMS field is a single string), so this is a render
 * decision, not a content change: the same characters reach the DOM in the same order
 * and a crawler or screen reader sees the identical label. Labels without an arrow
 * pass straight through untouched.
 */
export function ArrowLabel({ children }: Props) {
  const match = /^(.*?)\s*(→)$/.exec(children)
  if (!match) return <>{children}</>

  return (
    <>
      {match[1]}{' '}
      <span className="arrow-slide" aria-hidden="true">
        {match[2]}
      </span>
    </>
  )
}
