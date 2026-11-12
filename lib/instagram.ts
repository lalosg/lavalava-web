/**
 * Instagram API with Instagram Login — read-only client.
 *
 * Host is graph.instagram.com and the scope is `instagram_business_basic`.
 * The account must be a PROFESSIONAL account (Business or Creator); the old
 * Basic Display API, which worked with personal accounts, was shut down on
 * 2024-12-04 and every pre-2025 guide describes it.
 *
 * Reading our own account needs NO App Review — Standard Access covers an app
 * built for a business you own, and the token is generated straight from the
 * App Dashboard. App Review only enters the picture for serving OTHER people's
 * accounts, which this never does.
 *
 * ⚠️ There is no way to LIKE or COMMENT from our site. Meta exposes no such
 * endpoint to any caller and there is no embeddable like button. Interaction is
 * a handoff: send the visitor to `permalink` so the like lands on Instagram.
 *
 * ⚠️ Calls are UNVERSIONED on purpose, which means Meta resolves them to the
 * current version. Pin a version here once /api/instagram/health has reported
 * which one the account actually answers on — guessing a version number is a
 * hard 400, while an unpinned call only risks drifting later.
 */

/**
 * Two transports exist and which one a token speaks depends on how the app was
 * created. Apps made before the "unified login" rollout use Instagram Login
 * (graph.instagram.com, scope instagram_business_basic, `/me/...`); apps made
 * after it get a never-expiring System User token that speaks the Facebook
 * graph (graph.facebook.com, scope instagram_basic, `/{ig-user-id}/...`).
 *
 * The probe at /api/instagram/health tries both and reports which answers, so
 * this is settled by measurement rather than by reading a doc that lags the UI.
 */
export type Transport = 'instagram' | 'facebook'

const HOSTS: Record<Transport, string> = {
  instagram: 'https://graph.instagram.com',
  facebook: 'https://graph.facebook.com',
}

/** Numeric Instagram Business Account id. Required by the facebook transport. */
function userId(): string | undefined {
  return process.env.INSTAGRAM_USER_ID
}

export function transport(): Transport {
  return process.env.INSTAGRAM_TRANSPORT === 'instagram' ? 'instagram' : 'facebook'
}

/** `me` on the Instagram host, the account id on the Facebook one. */
function selfPath(t: Transport): string {
  if (t === 'instagram') return 'me'
  const id = userId()
  if (!id) throw new InstagramApiError('INSTAGRAM_USER_ID is not set (required by the facebook transport)', 0)
  return id
}

/** A post counts as a promotion when its caption carries this tag. */
export const PROMO_TAG = '#promo'

/** Fields we read off a media node. `like_count` is absent when likes are hidden. */
const MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'like_count',
  'comments_count',
  'children{media_type,media_url,thumbnail_url}',
].join(',')

export interface InstagramAccount {
  id: string
  username: string
  mediaCount: number
}

export interface InstagramPost {
  id: string
  caption: string
  permalink: string
  /** Still image to render. Null when Meta returned no usable frame. */
  imageUrl: string | null
  timestamp: string
  isVideo: boolean
  /** Null means "hidden by the account", NOT zero. Do not render it as 0. */
  likeCount: number | null
  commentCount: number | null
}

/** Carries Meta's own error body, which names the real cause (expired token, missing scope). */
export class InstagramApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly metaError?: unknown,
  ) {
    super(message)
    this.name = 'InstagramApiError'
  }
}

function token(): string {
  const t = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!t) {
    throw new InstagramApiError('INSTAGRAM_ACCESS_TOKEN is not set', 0)
  }
  return t
}

/**
 * Throws rather than returning a default. A thrown error keeps the last good
 * page in place under ISR; a silent `[]` would replace it with an empty one.
 */
async function get<T>(
  path: string,
  params: Record<string, string>,
  revalidate: number,
  t: Transport = transport(),
): Promise<T> {
  const url = new URL(`${HOSTS[t]}/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  url.searchParams.set('access_token', token())

  const res = await fetch(url, { next: { revalidate } })
  const body = await res.json().catch(() => null)

  if (!res.ok) {
    const meta = (body as { error?: { message?: string } } | null)?.error
    throw new InstagramApiError(
      meta?.message ?? `Instagram API returned ${res.status}`,
      res.status,
      meta,
    )
  }

  return body as T
}

export async function fetchAccount(
  revalidate = 3600,
  t: Transport = transport(),
): Promise<InstagramAccount> {
  const data = await get<{ id: string; username: string; media_count?: number }>(
    selfPath(t),
    { fields: 'id,username,media_count' },
    revalidate,
    t,
  )
  return {
    id: data.id,
    username: data.username,
    mediaCount: data.media_count ?? 0,
  }
}

interface RawMedia {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
  like_count?: number
  comments_count?: number
  children?: { data: Array<{ media_type: string; media_url?: string; thumbnail_url?: string }> }
}

/**
 * A CAROUSEL_ALBUM carries no `media_url` of its own, and a VIDEO's `media_url`
 * is the mp4 rather than a frame. Resolve a still in both cases.
 */
function stillFrame(m: RawMedia): string | null {
  if (m.media_type === 'VIDEO') return m.thumbnail_url ?? null
  if (m.media_type === 'CAROUSEL_ALBUM') {
    const first = m.children?.data?.[0]
    if (!first) return null
    return (first.media_type === 'VIDEO' ? first.thumbnail_url : first.media_url) ?? null
  }
  return m.media_url ?? null
}

function normalize(m: RawMedia): InstagramPost {
  return {
    id: m.id,
    caption: m.caption ?? '',
    permalink: m.permalink,
    imageUrl: stillFrame(m),
    timestamp: m.timestamp,
    isVideo: m.media_type === 'VIDEO',
    likeCount: m.like_count ?? null,
    commentCount: m.comments_count ?? null,
  }
}

/** Ten minutes is near enough to real time for a promotion and costs ~6 calls/hour. */
export async function fetchMedia(
  limit = 12,
  revalidate = 600,
  t: Transport = transport(),
): Promise<InstagramPost[]> {
  const data = await get<{ data: RawMedia[] }>(
    `${selfPath(t)}/media`,
    { fields: MEDIA_FIELDS, limit: String(limit) },
    revalidate,
    t,
  )
  return (data.data ?? []).map(normalize)
}

/**
 * Promotions only. The filter is a hashtag in the caption, so Lalo controls what
 * reaches the site from his phone — no CMS and no deploy.
 *
 * `limit` bounds how many RECENT posts are examined, not how many are returned,
 * because the tag is read client-side of the API.
 */
export async function fetchPromos(
  take = 6,
  scan = 24,
  revalidate = 600,
  t: Transport = transport(),
): Promise<InstagramPost[]> {
  const media = await fetchMedia(scan, revalidate, t)
  return media
    .filter((p) => p.caption.toLowerCase().includes(PROMO_TAG))
    .slice(0, take)
}

/**
 * Extends a long-lived token by 60 days. The token must already be >24h old and
 * unexpired; refreshing one younger than that silently returns it unchanged.
 *
 * ⚠️ ONLY the `instagram` transport needs this. A unified-login System User
 * token NEVER EXPIRES, which removes the refresh job, the persistence and the
 * whole 60-day failure mode. Kept for the older transport only.
 *
 * ⚠️ The new token CANNOT be written back to an env var — those are read-only at
 * runtime. If this is ever needed, persist it (the POS Supabase project) and
 * call this from a scheduled job. Returning it is all this function does.
 */
export async function refreshToken(): Promise<{ accessToken: string; expiresIn: number }> {
  const data = await get<{ access_token: string; expires_in: number }>(
    'refresh_access_token',
    { grant_type: 'ig_refresh_token' },
    0,
    'instagram',
  )
  return { accessToken: data.access_token, expiresIn: data.expires_in }
}
