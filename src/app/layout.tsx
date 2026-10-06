import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/components/Providers'
import Header from '@/components/header/Header'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import DeferredChatWidget from '@/components/DeferredChatWidget'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'ریحان سامانه هوشمند',
  description: '...',
  // icons و openGraph هم اضافه کن
}

const themeScript = `(function(){try{if(localStorage.getItem('reyhan-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="font-iran-sans" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" type="image/webp" sizes="16x16" href="/logo.webp" />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 dark:bg-[#071422] dark:text-slate-100">
        <ErrorBoundary>
          <AuthProvider>
          <Providers>
            <Header />
            <main className="min-h-screen bg-[#f3f6fb] dark:bg-[#071422]">
              {children}
              <DeferredChatWidget />
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