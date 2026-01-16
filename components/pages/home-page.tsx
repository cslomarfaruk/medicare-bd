// components/pages/home-page.tsx
import Hero from '@/components/sections/hero'
import Problems from '@/components/sections/problems'
import Features from '@/components/sections/features'
import AISection from '@/components/sections/ai-section'
import Pricing from '@/components/sections/pricing'
import FAQ from '@/components/sections/faq'
import TrustSignals from '@/components/sections/trust-signals'
import EarlyAccessForm from '@/components/forms/early-access-form'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <Features />
      <AISection />
      <Pricing />
      <FAQ />
      <TrustSignals />
      <EarlyAccessForm />
    </>
  )
}
