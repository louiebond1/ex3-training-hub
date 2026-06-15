import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'EX3 Training Hub',
  description: 'Step-by-step guidance for Employee Central, SF Pay and Time',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans bg-cloud text-carbon antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
