import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/components/Providers'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'
// import { Vazirmatn } from 'next/font/google' // یا next/font/local

// const vazirmatn = Vazirmatn({
//   subsets: ['arabic'],
//   display: 'swap',
//   variable: '--font-vazirmatn',
//   weight: ['400', '500', '700'],
//   preload: true,
//   adjustFontFallback: true,
// })

export const metadata: Metadata = {
  title: 'ریحان سامانه هوشمند',
  description: '...',
  // icons و openGraph هم اضافه کن
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="font-iran-sans">
      <link rel="icon" type="image/webp" sizes="16x16" href="/logo.webp" />
      <body className="antialiased">
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
        <Analytics />
      </body>
    </html>
  )
}