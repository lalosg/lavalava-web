import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const locales = ['es', 'en']
const paths = ['', '/servicios', '/a-domicilio', '/ubicacion']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      })
    }
  }

  // Root redirect
  entries.push({ url: SITE_URL, lastModified: new Date(), priority: 1.0 })

  return entries
}
