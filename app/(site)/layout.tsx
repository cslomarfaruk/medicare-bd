// app/(site)/layout.tsx
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}