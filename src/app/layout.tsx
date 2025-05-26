import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/components/Providers'

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Reyhan Smart Systems',
  description: 'Reyhan, a fresh scent in organizational management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/vazirmatn.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${vazirmatn.className} antialiased`}>
        <ErrorBoundary>
          <Providers>
            <Header />
            <main className="min-h-screen bg-white">
              {children}
            </main>
            <Toaster position="top-center" />
            <Footer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
} 