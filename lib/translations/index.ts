import { es } from './es'
import { en } from './en'
import type { Locale } from '@/lib/i18n'

export { es, en }
export type { Translations } from './es'

const translations = { es, en }

export function getT(locale: Locale) {
  return translations[locale] ?? translations.es
}

export const WA_NUMBER = '528118201400'

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

// Locale-aware nav paths (Spanish slugs for both locales)
export function localePath(locale: Locale, path: string) {
  return `/${locale}${path}`
}
