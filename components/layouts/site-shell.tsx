'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  // Persist inbound ref/id for attribution (keeps where user came from)
  useEffect(() => {
    const ref = searchParams.get('ref') || searchParams.get('id')
    if (ref) {
      try {
        localStorage.setItem('medicare_ref', ref)
        document.cookie = `medicare_ref=${ref}; path=/; max-age=31536000`
      } catch {
        // ignore storage issues
      }
    }
  }, [searchParams])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-emerald-50/40">
        {children}
      </main>
      <Footer />
    </>
  )
}
