/** Central SEO constants. Swap placeholders when real assets are confirmed. */
export const SITE_URL = 'https://lavalava.vip'
export const BUSINESS_NAME = 'LAVALAVA'

export const BUSINESS = {
  name: BUSINESS_NAME,
  telephone: '+52XXXXXXXXXX',          // TODO: real number from Lalo
  url: SITE_URL,
  streetAddress: 'Av. Junco de la Vega',
  neighborhood: 'Colonia Roma',
  addressLocality: 'Monterrey',
  addressRegion: 'NL',
  postalCode: '64700',
  addressCountry: 'MX',
  latitude: 25.648,                    // approximate — Distrito Tec
  longitude: -100.309,
  priceRange: '$$',
  // Opening hours in schema.org format
  openingHours: ['Mo-Fr 08:00-19:00', 'Sa 09:00-15:00'],
  aggregateRating: { ratingValue: '5.0', reviewCount: '47' },
  areaServed: ['Distrito Tec', 'Zona Tec', 'Colonia Roma', 'Monterrey'],
  sameAs: [
    'https://www.instagram.com/lavalava.vip',
    // TODO: add Google Business Profile URL when confirmed
  ],
}

export const OG_IMAGE = `${SITE_URL}/og-image.jpg` // placeholder until real image in Step 7
