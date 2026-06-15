'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'
import type { Module } from '@/lib/types'

export default function Sidebar({ module: mod }: { module: Module }) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const activeCategoryId = segments[3]
  const activeProcessId = segments[4]

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    mod.categories.reduce(
      (acc, cat) => ({ ...acc, [cat.id]: cat.id === activeCategoryId }),
      {} as Record<string, boolean>
    )
  )

  const toggle = (catId: string) => {
    setExpanded((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-cloud min-h-full">
      <div className="p-4 pt-6">
        <p className="text-xs font-semibold text-mid-gray uppercase tracking-wider mb-3 px-3">
          Categories
        </p>
        <nav className="space-y-1">
          {mod.categories.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => toggle(cat.id)}
                className={`flex items-center justify-between w-full px-3 py-2 text-left text-sm rounded-md transition-colors ${
                  cat.id === activeCategoryId && !activeProcessId
                    ? 'bg-cloud text-carbon font-semibold'
                    : 'text-carbon hover:bg-cloud'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder size={14} className="text-carbon shrink-0" />
                  <span>{cat.title}</span>
                </div>
                {expanded[cat.id] ? (
                  <ChevronDown size={13} className="text-mid-gray shrink-0" />
                ) : (
                  <ChevronRight size={13} className="text-mid-gray shrink-0" />
                )}
              </button>
              {expanded[cat.id] && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l border-cloud pl-3">
                  {cat.processes.map((proc) => {
                    const isActive = proc.id === activeProcessId
                    return (
                      <Link
                        key={proc.id}
                        href={`/module/${mod.id}/${cat.id}/${proc.id}`}
                        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'border-l-2 border-scarlet text-scarlet font-semibold -ml-3 pl-5 bg-cloud/60'
                            : 'text-mid-gray hover:text-carbon hover:bg-cloud'
                        }`}
                      >
                        {proc.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
