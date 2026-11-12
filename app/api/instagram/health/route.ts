import { NextResponse } from 'next/server'
import {
  fetchAccount,
  fetchMedia,
  fetchPromos,
  PROMO_TAG,
  InstagramApiError,
  type Transport,
} from '@/lib/instagram'

/**
 * POC "hello world" for the Instagram integration.
 *
 * It proves the four things that can independently fail — the Meta app exists,
 * the token is valid, the scope reaches the media edge, and the host answers —
 * and it does so against BOTH transports, because which one a token speaks
 * depends on whether the app predates Meta's "unified login" rollout and the
 * documentation lags the dashboard. The probe settles it by measurement.
 *
 * Diagnostics only: no secret is echoed, and everything returned is already
 * public on the Instagram profile. Delete this route once the feed is live.
 */

// No token exists at build time, so a prerender attempt would fail the build
// instead of reporting a bad token here.
export const dynamic = 'force-dynamic'

const TRANSPORTS: Transport[] = ['facebook', 'instagram']

async function probe(t: Transport) {
  try {
    const account = await fetchAccount(0, t)
    const media = await fetchMedia(24, 0, t)
    const promos = await fetchPromos(6, 24, 0, t)
    const latest = media[0]

    return {
      transport: t,
      ok: true as const,
      account,
      media: {
        fetched: media.length,
        latestCaption: latest ? latest.caption.slice(0, 160) : null,
        latestPermalink: latest?.permalink ?? null,
        latestTimestamp: latest?.timestamp ?? null,
        oldestFetchedTimestamp: media[media.length - 1]?.timestamp ?? null,
        // null means the account hides like counts — not that nobody liked it
        latestLikeCount: latest ? latest.likeCount : null,
        missingStillFrame: media.filter((p) => !p.imageUrl).map((p) => p.id),
      },
      promos: {
        tag: PROMO_TAG,
        matched: promos.length,
        captions: promos.map((p) => p.caption.slice(0, 80)),
      },
    }
  } catch (err) {
    if (err instanceof InstagramApiError) {
      return {
        transport: t,
        ok: false as const,
        status: err.status,
        error: err.message,
        meta: err.metaError,
      }
    }
    return {
      transport: t,
      ok: false as const,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export async function GET() {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        stage: 'env',
        error: 'INSTAGRAM_ACCESS_TOKEN is not set',
        hint: 'Meta App Dashboard → Instagram → section 2 "Generar tokens de acceso" → Generar token. Put it in .env.local and restart the dev server.',
      },
      { status: 503 },
    )
  }

  const results = await Promise.all(TRANSPORTS.map(probe))
  const working = results.find((r) => r.ok)

  return NextResponse.json(
    {
      ok: Boolean(working),
      // The value to pin as INSTAGRAM_TRANSPORT once one of them answers.
      use: working?.transport ?? null,
      userIdConfigured: Boolean(process.env.INSTAGRAM_USER_ID),
      results,
    },
    { status: working ? 200 : 502 },
  )
}
