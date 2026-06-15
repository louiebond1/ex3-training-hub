import Link from 'next/link'
import { Users, CreditCard, Clock, ChevronRight } from 'lucide-react'

const iconMap = { Users, CreditCard, Clock }

type ModuleCardProps = {
  id: string
  title: string
  description: string
  icon: string
  active: boolean
}

export default function ModuleCard({
  id,
  title,
  description,
  icon,
  active,
}: ModuleCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Users

  const inner = (
    <div
      className={`relative flex items-start gap-4 p-6 bg-cloud rounded-lg border-l-4 border-scarlet transition-all duration-150 ${
        active
          ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      <Icon size={22} className="text-carbon shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-carbon font-semibold text-base">{title}</h3>
          {active ? (
            <ChevronRight size={18} className="text-carbon shrink-0" />
          ) : (
            <span className="shrink-0 bg-scarlet text-cloud text-xs font-semibold px-2 py-0.5 rounded">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-mid-gray text-sm mt-1">{description}</p>
      </div>
    </div>
  )

  if (!active) return <div>{inner}</div>

  return <Link href={`/module/${id}`}>{inner}</Link>
}
