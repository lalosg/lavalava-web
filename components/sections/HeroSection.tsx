import Image from 'next/image'
// Static imports, not string paths: they let next/image generate a blurDataURL at build
// time. Without it the hero area is flat cream until the full image decodes, which reads
// as a broken page rather than a loading one. The blur costs ~1 kB inlined per image.
import heroDesktop from '@/public/images/hero-desktop.jpg'
import heroMobile from '@/public/images/hero-mobile.jpg'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { WaveMark } from '@/components/ui/WaveMark'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
  locale: string
}

export function HeroSection({ t, locale }: Props) {
  return (
    <section className="relative mt-16 h-hero overflow-hidden">

      {/*
        Art-directed hero. Both images render and CSS picks one — but display:none does
        NOT cancel a preload, and next/image emits no `media` on the preload it generates.
        With `priority` on both, every mobile visitor was fetching the desktop hero at
        fetchPriority=high alongside the one it actually shows, competing with LCP on the
        87% of traffic that is mobile.

        So `priority` stays on the mobile image only. The desktop image is left on
        next/image's default lazy loading, which emits no preload at all: browsers skip
        fetching a display:none lazy image, so mobile now never downloads it. Desktop
        still loads it during initial layout (native lazy loads in-viewport images
        immediately) — it only gives up the preload head-start, at 13% of traffic.
      */}
      {/* Desktop background image */}
      <Image
        src={heroDesktop}
        alt="Ropa blanca colgada al viento frente al mar — LAVALAVA Lavandería Premium"
        fill
        placeholder="blur"
        className="hidden md:block object-cover object-center"
        sizes="100vw"
      />
      {/* Mobile background image */}
      <Image
        src={heroMobile}
        alt="Ropa blanca colgada al viento frente al mar — LAVALAVA Lavandería Premium"
        fill
        priority
        placeholder="blur"
        className="block md:hidden object-cover object-center"
        sizes="100vw"
      />

      {/*
        Legibility scrim. The hero photograph is warm and busy, and the eyebrow and
        subhead sit on whatever happens to be behind them. Two soft navy gradients —
        top for the headline block, bottom for the SEO stripe and buttons — lift text
        off the image without reading as an overlay. Pointer-events none so the
        buttons underneath stay clickable; aria-hidden since it carries no meaning.
      */}
      <div
        className="absolute inset-0 pointer-events-none
                   bg-[linear-gradient(to_bottom,rgba(22,35,59,0.35)_0%,rgba(22,35,59,0.10)_28%,rgba(22,35,59,0)_45%,rgba(22,35,59,0.12)_72%,rgba(22,35,59,0.42)_100%)]"
        aria-hidden="true"
      />

      {/* Content — three tiers: headline top, SEO stripe + buttons bottom */}
      <div className="absolute inset-0 flex flex-col pt-10 md:pt-12">

        {/* Tier 1 + 2: wave + headline + subheadStrong — anchored top */}
        <div className="px-4 md:px-12">
          <div className="max-w-6xl mx-auto">

            <RevealOnScroll eager>
              <WaveMark size="md" className="mb-5 [&_path]:stroke-bone" />
            </RevealOnScroll>

            <RevealOnScroll eager delay={80}>
              <p className="hidden md:block font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-4 [text-shadow:0_1px_6px_rgba(0,0,0,0.3)]">
                {t.hero.eyebrow}
              </p>
            </RevealOnScroll>

            <RevealOnScroll eager delay={160}>
              {/* Tier 1: primary headline */}
              <h1 className="font-fraunces text-white leading-[1.04] tracking-tight mb-4 [text-shadow:0_2px_12px_rgba(0,0,0,0.2)]
                             text-[4rem] whitespace-pre-line
                             md:text-4xl md:whitespace-nowrap
                             lg:text-5xl">
                {t.hero.headline}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll eager delay={240}>
              {/* Tier 2: service descriptor */}
              <p className="font-fraunces text-white/90 leading-snug [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]
                            text-xl md:text-lg">
                {t.hero.subheadStrong}
              </p>
            </RevealOnScroll>

          </div>
        </div>

        {/* Flex spacer — pushes bottom content down */}
        <div className="flex-1" />

        {/* Buttons — above the stripe */}
        <RevealOnScroll eager delay={300}>
          <div className="px-4 md:px-12 pb-5 md:pb-6">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
              <a
                href={waLink(t.hero.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy text-white font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-navy/90 transition-colors"
              >
                <WhatsAppIcon size={18} />
                {t.hero.ctaPrimary}
              </a>
              <a
                href={`/${locale}/ubicacion`}
                className="inline-flex items-center justify-center px-7 py-4 bg-navy/75 border border-white/25 text-white font-sans font-medium text-sm rounded-full hover:bg-navy/90 transition-colors backdrop-blur-sm"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* Tier 3: SEO/AEO stripe — full-bleed, pinned to very bottom */}
        <RevealOnScroll eager delay={380}>
          <div className="w-full bg-navy/60 backdrop-blur-[3px] py-3 md:py-4 px-4 md:px-12">
            <p className="max-w-6xl mx-auto font-sans text-white/85 text-sm md:text-xs leading-relaxed">
              {t.hero.subheadTertiary}
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
