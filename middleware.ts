import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, type Locale } from '@/lib/i18n'

const defaultLocale: Locale = 'es'

function detectLocale(request: NextRequest): Locale {
  const acceptLang = request.headers.get('accept-language') ?? ''
  // Prefer English only if 'en' appears before 'es' (or 'es' is absent)
  const enIndex = acceptLang.toLowerCase().indexOf('en')
  const esIndex = acceptLang.toLowerCase().indexOf('es')
  if (enIndex !== -1 && (esIndex === -1 || enIndex < esIndex)) return 'en'
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Pass through Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Already has a valid locale prefix — let it through
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  // Redirect bare paths to locale-prefixed version
  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
}
