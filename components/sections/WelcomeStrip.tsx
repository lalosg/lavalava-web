import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function WelcomeStrip({ t }: Props) {
  return (
    <div className="bg-sand section-px py-6">
      <p className="font-sans text-sm text-ink/70 leading-snug max-w-2xl mx-auto">
        {t.welcome.text}
      </p>
    </div>
  )
}
