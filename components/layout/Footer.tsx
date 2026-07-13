import Link from 'next/link'
import { WaveMark } from '@/components/ui/WaveMark'
import { getT, localePath } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
}

export function Footer({ locale }: Props) {
  const t = getT(locale)

  const nav = [
    { label: t.nav.services,  href: localePath(locale, '/servicios') },
    { label: t.nav.delivery,  href: localePath(locale, '/a-domicilio') },
    { label: t.nav.location,  href: localePath(locale, '/ubicacion') },
  ]

  const copyright = t.footer.copyright.replace('{year}', String(new Date().getFullYear()))

  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <WaveMark size="sm" className="[&_path]:stroke-white/40" />
              <span className="font-fraunces text-base font-semibold tracking-[0.08em] text-white/80">
                LAVALAVA
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs whitespace-pre-line">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3 text-sm">
            <p>{t.footer.address}</p>
            <p>{t.footer.city}</p>
            <a
              href={`mailto:${t.footer.email}`}
              className="hover:text-white/80 transition-colors"
            >
              {t.footer.email}
            </a>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="/es"
                className={locale === 'es' ? 'text-white/80 text-xs font-semibold' : 'text-white/35 text-xs font-semibold hover:text-white/60 transition-colors'}
              >
                ES
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/en"
                className={locale === 'en' ? 'text-white/80 text-xs font-semibold' : 'text-white/35 text-xs font-semibold hover:text-white/60 transition-colors'}
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-white/10 my-10" />

        <p className="text-xs text-white/30">{copyright}</p>
      </div>
    </footer>
  )
}
