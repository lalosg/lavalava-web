import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'

/** Central SEO constants. Swap placeholders when real assets are confirmed. */
export const SITE_URL = 'https://lavalava.vip'
export const BUSINESS_NAME = 'LAVALAVA'

export const BUSINESS = {
  name: BUSINESS_NAME,
  telephone: '+528118201400',
  url: SITE_URL,
  streetAddress: 'Av. Junco de la Vega 2224B',
  neighborhood: 'Colonia Roma',
  addressLocality: 'Monterrey',
  addressRegion: 'NL',
  postalCode: '64700',
  addressCountry: 'MX',
  // Verified coordinates from the Google Business Profile listing —
  // must stay in sync with DEFAULT_SRC in components/ui/LazyMap.tsx
  latitude: 25.6559152,
  longitude: -100.2927385,
  priceRange: '$$',
  // Opening hours in schema.org format — the single source of truth.
  // JsonLd.tsx derives openingHoursSpecification from this; never hardcode hours.
  openingHours: ['Mo-Fr 08:00-19:30', 'Sa 09:00-15:30'],
  areaServed: ['Distrito Tec', 'Zona Tec', 'Colonia Roma', 'Monterrey'],
  sameAs: [
    'https://www.instagram.com/lavalava.vip',
    // TODO(Lalo): add the Google Business Profile URL. The share link in
    // components/sections/LocationSection.tsx (share.google/2JPAcqEaTyrn6Dl3r)
    // is a candidate but is a shortlink, not the canonical profile URL.
  ],
}

export const OG_IMAGE = `${SITE_URL}/og-image.jpg` // placeholder until real image in Step 7

/**
 * Per-page metadata builder.
 *
 * Every page MUST supply its own metadata via this helper. Next merges metadata from
 * the closest segment, so a page without `generateMetadata` inherits the layout's
 * `alternates.canonical` — which points at the locale root. That made all six sub-pages
 * declare the homepage as their canonical and removed them from the index.
 *
 * `path` is the locale-less route ('/servicios'); '' is the homepage.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale
  path: string
  title: string
  description: string
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`
  const isEs = locale === 'es'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es${path}`,
        en: `${SITE_URL}/en${path}`,
        'x-default': `${SITE_URL}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS_NAME,
      locale: isEs ? 'es_MX' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_MX',
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}
