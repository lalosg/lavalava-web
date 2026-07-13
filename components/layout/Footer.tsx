import Link from 'next/link'
import { WaveMark } from '@/components/ui/WaveMark'

interface Props {
  locale: string
}

export function Footer({ locale }: Props) {
  const isEs = locale === 'es'

  const nav = isEs
    ? [
        { label: 'Servicios', href: '/servicios' },
        { label: 'A domicilio', href: '/a-domicilio' },
        { label: 'Ubicación', href: '/ubicacion' },
      ]
    : [
        { label: 'Services', href: '/en/services' },
        { label: 'Pickup & Delivery', href: '/en/pickup-delivery' },
        { label: 'Location', href: '/en/location' },
      ]

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
            <p className="text-sm leading-relaxed max-w-xs">
              Lavandería y tintorería premium<br />
              en Distrito Tec, Monterrey.
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
            <p>Av. Junco de la Vega, Col. Roma</p>
            <p>Distrito Tec, Monterrey, NL</p>
            <a
              href="mailto:hola@lavalava.vip"
              className="hover:text-white/80 transition-colors"
            >
              hola@lavalava.vip
            </a>
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="/"
                className={isEs ? 'text-white/80 text-xs font-semibold' : 'text-white/35 text-xs font-semibold hover:text-white/60 transition-colors'}
              >
                ES
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/en"
                className={!isEs ? 'text-white/80 text-xs font-semibold' : 'text-white/35 text-xs font-semibold hover:text-white/60 transition-colors'}
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-white/10 my-10" />

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} LAVALAVA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
