import { WaveMark } from '@/components/ui/WaveMark'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function WelcomeStrip({ t }: Props) {
  return (
    <div className="bg-sand section-px py-6 flex items-center gap-4">
      <div className="flex-shrink-0">
        <WaveMark size="sm" className="[&_path]:stroke-ink/40" />
      </div>
      <p className="font-sans text-sm text-ink/70 leading-snug">
        {t.welcome.text}
      </p>
    </div>
  )
}
