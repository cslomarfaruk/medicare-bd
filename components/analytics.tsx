// components/analytics.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const url = pathname + searchParams.toString()
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  // Basic page view tracking
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/tracking/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer,
          }),
        })
      } catch (error) {
        console.error('Tracking error:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}