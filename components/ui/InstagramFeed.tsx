interface InstagramFeedProps {
  placeholderCount?: number
}

/**
 * Placeholder grid, shown until the live feed lands.
 *
 * The live feed is being built against the Instagram API with Instagram Login
 * (graph.instagram.com, scope `instagram_business_basic`), fetched server-side
 * and rendered with this site's own design system — no third-party widget.
 */
export function InstagramFeed({ placeholderCount = 6 }: InstagramFeedProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-sand/40 border border-[var(--line)] flex items-center justify-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(27,37,54,0.2)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="rgba(27,37,54,0.2)" stroke="none" />
          </svg>
        </div>
      ))}
    </div>
  )
}
