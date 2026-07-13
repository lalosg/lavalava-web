import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'
import { JsonLd } from '@/components/JsonLd'
import { HeroSection } from '@/components/sections/HeroSection'
import { WelcomeStrip } from '@/components/sections/WelcomeStrip'
import { PillarsSection } from '@/components/sections/PillarsSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { DeliverySection } from '@/components/sections/DeliverySection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

interface Props {
  params: { locale: Locale }
}

export default function HomePage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <>
      <JsonLd />
      <HeroSection t={t} locale={params.locale} />
      <WelcomeStrip t={t} />
      <PillarsSection t={t} />
      <TrustBar t={t} />
      <ServicesSection t={t} />
      <HowItWorksSection t={t} />
      <DeliverySection t={t} />
      <ReviewsSection t={t} />
      <InstagramSection t={t} />
      <TrustBar t={t} />
      <LocationSection t={t} />
      <FAQSection t={t} />
      <FinalCTASection t={t} />
    </>
  )
}
