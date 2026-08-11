import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/components/Providers'
import Header from '@/components/header/Header'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import ChatWidget from '@/components/ChatWidget'
import { AuthProvider } from '@/context/AuthContext'

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
          <AuthProvider>
          <Providers>
            <Header />
            <main className="min-h-screen bg-white">
              {children}
              <ChatWidget />
            </main>
            <Toaster position="top-center" />
            <Footer />
          </Providers>
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}