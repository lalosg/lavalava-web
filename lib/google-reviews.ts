export interface GoogleReview {
  name: string
  text: string
  rating: number
  relativeTime: string
}

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return []

  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lavalava-web.vercel.app'

    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.reviews',
        'Referer': origin,
      },
      body: JSON.stringify({
        textQuery: 'Lavandería y Tintorería Lavalava Monterrey',
        languageCode: 'es',
      }),
      // Cache for 24h — reviews don't change by the minute
      next: { revalidate: 86400 },
    })

    if (!res.ok) return []

    const data = await res.json()
    const reviews = data.places?.[0]?.reviews ?? []

    return reviews
      .map((r: Record<string, unknown>) => {
        const text = (r.originalText as Record<string, string>)?.text
          ?? (r.text as Record<string, string>)?.text
          ?? ''
        const author = r.authorAttribution as Record<string, string> | undefined
        return {
          name: author?.displayName ?? 'Cliente',
          text,
          rating: (r.rating as number) ?? 5,
          relativeTime: (r.relativePublishTimeDescription as string) ?? '',
        }
      })
  } catch {
    return []
  }
}
