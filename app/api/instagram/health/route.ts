import { NextResponse } from 'next/server'
import { fetchAccount, fetchMedia, fetchPromos, PROMO_TAG, InstagramApiError } from '@/lib/instagram'

/**
 * POC "hello world" for the Instagram integration.
 *
 * One call proves the four things that can independently fail: the Meta app
 * exists, the token is valid, the scope reaches the media edge, and the host
 * answers. If this returns `username: "lavalava.vip"`, the rest is layout.
 *
 * Diagnostics only — no secret is echoed, and the data returned is already
 * public on the Instagram profile. Delete this route once the feed is live.
 */

// Must not be evaluated at build time: there is no token during a build, and a
// prerender attempt would fail the build instead of reporting a bad token here.
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        stage: 'env',
        error: 'INSTAGRAM_ACCESS_TOKEN is not set',
        hint: 'Generate a token in the Meta App Dashboard → Instagram → API setup with Instagram business login → Generate token, then put it in .env.local',
      },
      { status: 503 },
    )
  }

  try {
    const account = await fetchAccount(0)
    const media = await fetchMedia(24, 0)
    const promos = await fetchPromos(6, 24, 0)
    const latest = media[0]

    return NextResponse.json({
      ok: true,
      account,
      media: {
        fetched: media.length,
        latestCaption: latest ? latest.caption.slice(0, 160) : null,
        latestPermalink: latest?.permalink ?? null,
        // null here means the account hides like counts — not that nobody liked it
        latestLikeCount: latest ? latest.likeCount : null,
        missingStillFrame: media.filter((p) => !p.imageUrl).map((p) => p.id),
      },
      promos: {
        tag: PROMO_TAG,
        matched: promos.length,
        captions: promos.map((p) => p.caption.slice(0, 80)),
      },
    })
  } catch (err) {
    if (err instanceof InstagramApiError) {
      return NextResponse.json(
        { ok: false, stage: 'instagram-api', status: err.status, error: err.message, meta: err.metaError },
        { status: 502 },
      )
    }
    return NextResponse.json(
      { ok: false, stage: 'unknown', error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
