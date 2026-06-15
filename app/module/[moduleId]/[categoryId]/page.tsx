import { notFound } from 'next/navigation'
import content from '@/data/content.json'
import type { Module } from '@/lib/types'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'

export default function CategoryPage({
  params,
}: {
  params: { moduleId: string; categoryId: string }
}) {
  const mod = content.modules.find((m) => m.id === params.moduleId)
  if (!mod || !mod.active) notFound()

  const category = mod.categories.find((c) => c.id === params.categoryId)
  if (!category) notFound()

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: mod.title, href: `/module/${mod.id}` },
    { label: category.title },
  ]

  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar module={mod as unknown as Module} />
        <main className="flex-1 px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-carbon text-2xl font-bold mt-4 mb-6">
            {category.title}
          </h1>

          <div className="space-y-3 max-w-2xl">
            {category.processes.map((proc) => (
              <Link
                key={proc.id}
                href={`/module/${mod.id}/${category.id}/${proc.id}`}
                className="flex items-center justify-between bg-white border border-cloud rounded-lg p-5 hover:shadow-sm hover:border-mid-gray transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText size={17} className="text-carbon shrink-0" />
                  <div>
                    <p className="text-carbon font-medium text-sm group-hover:text-scarlet transition-colors">
                      {proc.title}
                    </p>
                    <p className="text-mid-gray text-xs mt-0.5">
                      {proc.steps.length} steps
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-mid-gray" />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
