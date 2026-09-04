import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const locales = ['es', 'en']
const paths = ['', '/servicios', '/a-domicilio', '/ubicacion']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        // No `lastModified`: stamping new Date() on every build told Google that every
        // page changed on every deploy, which devalues the signal for pages that really
        // did change. Omitting it is better than reporting a date we cannot stand behind.
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      })
    }
  }

  // The bare origin is deliberately absent: middleware.ts always redirects / to /{locale},
  // and listing a redirecting URL in a sitemap is an error.
  return entries
}
