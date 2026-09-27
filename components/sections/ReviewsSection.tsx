import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { RevealText } from '@/components/motion/RevealText'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/translations'
import type { Translations } from '@/lib/translations'
import type { GoogleReview } from '@/lib/google-reviews'

const GoogleGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

interface Props {
  t: Translations
  googleReviews?: GoogleReview[]
}

export function ReviewsSection({ t, googleReviews }: Props) {
  const pool = googleReviews && googleReviews.length > 0
    ? googleReviews.map(r => ({ name: r.name, text: r.text, rating: r.rating }))
    : t.reviews.items

  // Pick 3 random from the pool — rotates on each ISR revalidation (24h)
  const reviews = pool.length > 3
    ? [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
    : pool

  return (
    /*
      overflow-x-clip contains the horizontal card scroller. Without it the snap
      scroller's scroll width leaked into the document on mobile, and a page-wide
      sideways scroll cuts every other section off at the right edge. `clip` rather
      than `hidden` so it cannot accidentally become a scroll container itself.
    */
    <section className="bg-bone-alt py-20 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <div className="section-px mb-10">
            <p className="eyebrow mb-4">{t.reviews.eyebrow}</p>
            <RevealText as="h2" text={t.reviews.headline} className="font-fraunces text-4xl md:text-5xl text-ink leading-tight max-w-sm" />
          </div>
        </RevealOnScroll>

        {/* Review cards — horizontal scroll on mobile */}
        <RevealOnScroll>
          <div className="flex gap-4 overflow-x-auto section-px pb-2 snap-x snap-mandatory
                          md:grid md:grid-cols-3 md:overflow-visible">
            {reviews.map((review) => (
              <div
                key={review.name}
                /*
                  w-[280px] as well as min-w, because min-width only sets a floor: a
                  flex item with flex-shrink-0 and no width sizes to its MAX-content
                  width, so each card grew to fit its review on one line — measured at
                  698px against a 390px viewport. Three of those pushed the document
                  to 1391px and gave the whole site a horizontal scroll on mobile.
                */
                className="w-[280px] min-w-[280px] md:w-auto md:min-w-0 snap-start flex-shrink-0 md:flex-shrink
                           bg-bone border border-[var(--line)] p-6 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm" aria-hidden="true">★</span>
                  ))}
                  <span className="sr-only">
                    {t.reviews.starsLabel.replace('{rating}', String(review.rating))}
                  </span>
                  <span className="ml-auto flex-shrink-0"><GoogleGlyph /></span>
                </div>

                {/* Text */}
                <p className="font-sans text-sm text-ink/65 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                    <span className="font-fraunces text-[11px] text-ink font-medium">
                      {review.name[0]}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-semibold text-ink/65">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Feedback CTA — navy card */}
        <RevealOnScroll delay={100}>
          <div className="mx-8 mt-6 bg-navy p-6 flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-sm text-bone/60">{t.reviews.feedback}</p>
            <a
              href={waLink(t.reviews.feedbackMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-bone/20 text-bone/70 font-sans text-xs font-semibold tracking-eyebrow uppercase rounded-full hover:border-bone/40 hover:text-bone/90 transition-colors"
            >
              <WhatsAppIcon size={14} />
              WhatsApp
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
