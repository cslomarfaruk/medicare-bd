// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Inter, Noto_Sans_Bengali } from 'next/font/google'
import { LanguageProvider } from '@/contexts/language-context'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
})

// Base metadata for the application. Page-level files can override/extend this.
export const metadata: Metadata = {
  title: 'medico.ai - AI-Powered Healthcare Management Platform',
  description:
    "Bangladesh's first AI-powered clinic management software. Complete digital transformation for medical practices with patient management, billing, inventory, and AI analytics.",
  keywords:
    'clinic software, hospital management, medical software Bangladesh, EHR, EMR, healthcare management, medical billing',
  authors: [{ name: 'medico.ai' }],
  openGraph: {
    title: 'medico.ai - Revolutionizing Healthcare in Bangladesh',
    description: 'Complete digital transformation for medical practices with AI-powered tools.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: 'https://medico.ai.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'medico.ai - AI-Powered Healthcare Platform',
    description: 'Transform your medical practice with AI-powered management tools',
  },
  alternates: {
    canonical: 'https://medico.ai.com/',
    languages: {
      en: 'https://medico.ai.com/',
      bn: 'https://medico.ai.com/bn',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansBengali.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}