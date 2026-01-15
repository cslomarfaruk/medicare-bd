// app/page.tsx – root landing page (English by default)
import HomePage from './(site)/page'
import SiteShell from '@/components/layouts/site-shell'

export default function RootPage() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  )
}