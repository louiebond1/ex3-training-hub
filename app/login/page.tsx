'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-indigo-deep flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-cloud text-6xl font-bold tracking-tight mb-2">EX3</h1>
        <p className="text-mid-gray text-sm tracking-wide">Envision. Execute. Excel.</p>
      </div>

      <div className="w-full max-w-sm bg-[#231454] border border-[#2e1a6b] rounded-xl p-8 shadow-2xl">
        <h2 className="text-cloud text-lg font-semibold mb-6">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-cloud text-sm mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-indigo-deep border border-[#2e1a6b] rounded-lg text-cloud placeholder-[#555577] focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-cloud text-sm mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-indigo-deep border border-[#2e1a6b] rounded-lg text-cloud placeholder-[#555577] focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent text-sm"
            />
          </div>

          {error && <p className="text-scarlet text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-scarlet text-cloud font-semibold rounded-lg hover:bg-[#e02900] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
