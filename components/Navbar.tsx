'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full bg-indigo-deep">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <Link
          href="/dashboard"
          className="text-cloud text-xl font-bold tracking-tight"
        >
          EX3
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-mid-gray text-sm hidden sm:block">
            {session?.user?.name ?? session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-cloud text-sm hover:text-mid-gray transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
