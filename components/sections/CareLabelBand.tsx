import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { CareSymbol, type CareKind } from '@/components/ui/CareSymbol'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

/**
 * The page's signature.
 *
 * Everything else here could belong to any premium brand: cream, a high-contrast
 * serif, generous air. The care symbols are the one visual language that belongs to
 * a laundry and nothing else — they are already printed inside every garment the shop
 * handles. Using them as a device, rather than illustrating the idea of care, is what
 * makes this section theirs.
 *
 * It sits straight after the catalogue, which is where a reader who has just seen the
 * list of services starts wondering whether these people know how to handle THEIR
 * thing. The answer is given in the trade's own alphabet.
 */
export function CareLabelBand({ t }: Props) {
  const c = t.careLabel

  return (
    <section className="bg-bone-alt py-20 md:py-24 section-px">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <div className="max-w-xl">
            <RevealOnScroll>
              <p className="eyebrow mb-4">{c.eyebrow}</p>
              <RevealText
                as="h2"
                text={c.headline}
                className="font-fraunces text-4xl md:text-5xl text-ink leading-tight mb-6"
              />
              <p className="font-sans text-base text-ink/65 leading-relaxed">{c.body}</p>
            </RevealOnScroll>
          </div>

          {/* The tag itself: symbols in a row over a hairline, the way a real care
              label prints them. Labels are visible text, so the symbols never have to
              carry meaning on their own. */}
          <RevealOnScroll delay={120}>
            <div className="border border-[var(--line)] bg-bone px-7 py-9 lg:min-w-[24rem]">
              {/* 3 + 2 on a phone. Five columns put "TINTORERÍA", "PLANCHADO" and
                  "BLANQUEADO" in 70px each, and they ran into one another. */}
              <ul className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-7">
                {c.symbols.map((s) => (
                  <li key={s.kind} className="flex flex-col items-center gap-3.5 text-center">
                    <CareSymbol kind={s.kind as CareKind} size={40} className="text-teal" />
                    <span className="font-sans text-[9px] leading-tight tracking-eyebrow uppercase text-ink/65">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
