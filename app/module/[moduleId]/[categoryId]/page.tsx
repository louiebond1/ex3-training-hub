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
            {category.processes.map((proc) => {
              const comingSoon = (proc as { comingSoon?: boolean }).comingSoon
              const inner = (
                <div className={`flex items-center justify-between bg-white border border-cloud rounded-lg p-5 transition-all ${comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-sm hover:border-mid-gray group'}`}>
                  <div className="flex items-center gap-3">
                    <FileText size={17} className="text-carbon shrink-0" />
                    <div>
                      <p className={`font-medium text-sm ${comingSoon ? 'text-carbon' : 'text-carbon group-hover:text-scarlet transition-colors'}`}>
                        {proc.title}
                      </p>
                      <p className="text-mid-gray text-xs mt-0.5">
                        {proc.steps.length} steps
                      </p>
                    </div>
                  </div>
                  {comingSoon ? (
                    <span className="bg-scarlet text-cloud text-xs font-semibold px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  ) : (
                    <ChevronRight size={16} className="text-mid-gray" />
                  )}
                </div>
              )
              return comingSoon ? (
                <div key={proc.id}>{inner}</div>
              ) : (
                <Link key={proc.id} href={`/module/${mod.id}/${category.id}/${proc.id}`}>
                  {inner}
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
