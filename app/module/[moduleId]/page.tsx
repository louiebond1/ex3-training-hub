import { notFound } from 'next/navigation'
import content from '@/data/content.json'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'

export default function ModulePage({
  params,
}: {
  params: { moduleId: string }
}) {
  const mod = content.modules.find((m) => m.id === params.moduleId)
  if (!mod || !mod.active) notFound()

  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Breadcrumb
          items={[{ label: 'Home', href: '/dashboard' }, { label: mod.title }]}
        />
        <h1 className="text-carbon text-3xl font-bold mt-4 mb-1">{mod.title}</h1>
        <p className="text-mid-gray mb-10">{mod.description}</p>

        <div className="space-y-5">
          {mod.categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-lg border border-cloud p-6">
              <h2 className="text-carbon font-semibold text-base mb-4">
                {cat.title}
              </h2>
              <div className="space-y-1">
                {cat.processes.map((proc) => (
                  <Link
                    key={proc.id}
                    href={`/module/${mod.id}/${cat.id}/${proc.id}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-cloud transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={15} className="text-carbon shrink-0" />
                      <span className="text-carbon text-sm group-hover:text-scarlet transition-colors">
                        {proc.title}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-mid-gray" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
