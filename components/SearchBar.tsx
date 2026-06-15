'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search processes, steps or topics…"
        className="w-full pl-11 pr-4 py-3.5 bg-white border border-cloud rounded-lg text-carbon placeholder-mid-gray focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent text-base shadow-sm"
      />
    </form>
  )
}
