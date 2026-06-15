import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-1 text-sm text-mid-gray">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={13} className="text-mid-gray" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-carbon transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-carbon font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
