import { notFound } from 'next/navigation'
import content from '@/data/content.json'
import type { Module } from '@/lib/types'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import StepCard from '@/components/StepCard'
import ProcessClientSection from '@/components/ProcessClientSection'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProcessPage({
  params,
}: {
  params: { moduleId: string; categoryId: string; processId: string }
}) {
  const mod = content.modules.find((m) => m.id === params.moduleId)
  if (!mod || !mod.active) notFound()

  const category = mod.categories.find((c) => c.id === params.categoryId)
  if (!category) notFound()

  const process = category.processes.find((p) => p.id === params.processId)
  if (!process) notFound()

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: mod.title, href: `/module/${mod.id}` },
    { label: category.title, href: `/module/${mod.id}/${category.id}` },
    { label: process.title },
  ]

  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar module={mod as unknown as Module} />
        <main className="flex-1 px-8 py-8">
          <div className="max-w-3xl">
            <Link
              href={`/module/${mod.id}/${category.id}`}
              className="inline-flex items-center gap-1.5 text-mid-gray hover:text-carbon text-sm transition-colors mb-4"
            >
              <ArrowLeft size={13} />
              Back to {category.title}
            </Link>

            <Breadcrumb items={breadcrumbItems} />

            <div className="flex items-start justify-between mt-6 mb-8 gap-4">
              <h1 className="text-carbon text-2xl font-bold">{process.title}</h1>
              <ProcessClientSection
                processTitle={process.title}
                videoUrl={(process as { video?: string }).video}
              />
            </div>

            <div className="space-y-4">
              {process.steps.map((step) => (
                <StepCard
                  key={step.id}
                  stepNumber={step.id}
                  description={step.description}
                  screenshot={(step as { screenshot?: string }).screenshot}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
