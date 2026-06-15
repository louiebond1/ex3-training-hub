import content from '@/data/content.json'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { FileText, SearchX } from 'lucide-react'

type SearchResult = {
  moduleId: string
  moduleTitle: string
  categoryId: string
  categoryTitle: string
  processId: string
  processTitle: string
}

function searchContent(query: string): SearchResult[] {
  const results: SearchResult[] = []
  const q = query.toLowerCase()

  for (const mod of content.modules) {
    for (const cat of mod.categories) {
      for (const proc of cat.processes) {
        const matchesTitle =
          proc.title.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q) ||
          mod.title.toLowerCase().includes(q)

        const matchesStep = proc.steps.some((s) =>
          s.description.toLowerCase().includes(q)
        )

        if (matchesTitle || matchesStep) {
          results.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            categoryId: cat.id,
            categoryTitle: cat.title,
            processId: proc.id,
            processTitle: proc.title,
          })
        }
      }
    }
  }

  return results
}

type GroupedResults = Record<
  string,
  {
    title: string
    categories: Record<string, { title: string; processes: SearchResult[] }>
  }
>

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q?.trim() ?? ''
  const results = query ? searchContent(query) : []

  const grouped = results.reduce<GroupedResults>((acc, r) => {
    if (!acc[r.moduleId]) acc[r.moduleId] = { title: r.moduleTitle, categories: {} }
    if (!acc[r.moduleId].categories[r.categoryId])
      acc[r.moduleId].categories[r.categoryId] = { title: r.categoryTitle, processes: [] }
    acc[r.moduleId].categories[r.categoryId].processes.push(r)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[{ label: 'Home', href: '/dashboard' }, { label: 'Search' }]}
        />

        <div className="mt-6 mb-8">
          <SearchBar initialValue={query} />
        </div>

        {query && (
          <p className="text-mid-gray text-sm mb-6">
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-20">
            <SearchX size={36} className="text-mid-gray mx-auto mb-4" />
            <p className="text-carbon font-semibold mb-1">No results found</p>
            <p className="text-mid-gray text-sm">
              Try different keywords or browse the modules directly.
            </p>
          </div>
        )}

        {Object.entries(grouped).map(([moduleId, moduleData]) => (
          <div key={moduleId} className="mb-8">
            <h2 className="text-carbon font-semibold text-base mb-4">
              {moduleData.title}
            </h2>
            {Object.entries(moduleData.categories).map(([catId, catData]) => (
              <div key={catId} className="mb-4">
                <p className="text-mid-gray text-xs font-semibold uppercase tracking-wider mb-2">
                  {catData.title}
                </p>
                <div className="space-y-2">
                  {catData.processes.map((r) => (
                    <Link
                      key={r.processId}
                      href={`/module/${r.moduleId}/${r.categoryId}/${r.processId}`}
                      className="flex items-center gap-3 bg-white border border-cloud rounded-lg p-4 hover:shadow-sm hover:border-mid-gray transition-all group"
                    >
                      <FileText size={15} className="text-carbon shrink-0" />
                      <div>
                        <p className="text-carbon text-sm font-medium group-hover:text-scarlet transition-colors">
                          {r.processTitle}
                        </p>
                        <p className="text-mid-gray text-xs mt-0.5">
                          {r.categoryTitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
