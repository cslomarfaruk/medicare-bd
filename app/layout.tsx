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
  title: 'Managemed - AI-Powered Healthcare Management Platform',
  description:
    "Bangladesh's first AI-powered clinic management software. Complete digital transformation for medical practices with patient management, billing, inventory, and AI analytics.",
  keywords:
    'clinic software, hospital management, medical software Bangladesh, EHR, EMR, healthcare management, medical billing',
  authors: [{ name: 'Managemed' }],
  openGraph: {
    title: 'Managemed - Revolutionizing Healthcare in Bangladesh',
    description: 'Complete digital transformation for medical practices with AI-powered tools.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: 'https://managemed.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Managemed - AI-Powered Healthcare Platform',
    description: 'Transform your medical practice with AI-powered management tools',
  },
  alternates: {
    canonical: 'https://managemed.vercel.app/',
    languages: {
      en: 'https://managemed.vercel.app/',
      bn: 'https://managemed.vercel.app/bn',
    },
  },
  verification: {
    google: 'u-no173NtvyP0jiCQjvkY2UNiQWqImCojhcX1dpHnwc', 
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