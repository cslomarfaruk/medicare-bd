import Hero from '@/components/sections/hero'
import Problems from '@/components/sections/problems'
import Features from '@/components/sections/features'
import AISection from '@/components/sections/ai-section'
import Pricing from '@/components/sections/pricing'
import FAQ from '@/components/sections/faq'
import TrustSignals from '@/components/sections/trust-signals'
import EarlyAccessForm from '@/components/forms/early-access-form'
import SiteShell from '@/components/layouts/site-shell'

export const metadata = {
  title: 'MediCareBD - বাংলাদেশের প্রথম এআই-পাওয়ারড ক্লিনিক ম্যানেজমেন্ট সফটওয়্যার',
  description: 'আপনার চিকিৎসা প্রতিষ্ঠানের সম্পূর্ণ ডিজিটাল রূপান্তর। রোগী ব্যবস্থাপনা, বিলিং, ইনভেন্টরি থেকে এআই-রিপোর্ট বিশ্লেষণ - সবকিছু এক প্ল্যাটফর্মে।',
  keywords: 'ক্লিনিক সফটওয়্যার, হাসপাতাল ব্যবস্থাপনা, মেডিকেল সফটওয়্যার বাংলাদেশ, ইএইচআর, ইএমআর, স্বাস্থ্যসেবা ব্যবস্থাপনা, চিকিৎসা বিলিং',
  authors: [{ name: 'MediCareBD' }],
  openGraph: {
    title: 'MediCareBD - বাংলাদেশের চিকিৎসা ব্যবস্থায় বিপ্লব',
    description: 'এআই-পাওয়ারড টুলসের মাধ্যমে চিকিৎসা সেবার সম্পূর্ণ ডিজিটাল রূপান্তর',
    type: 'website',
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediCareBD - এআই-পাওয়ারড স্বাস্থ্যসেবা প্ল্যাটফর্ম',
    description: 'এআই-পাওয়ারড ব্যবস্থাপনা টুলসের মাধ্যমে আপনার চিকিৎসা প্রতিষ্ঠানকে রূপান্তর করুন',
  },
  alternates: {
    canonical: 'https://medicarebd.com/bn',
    languages: {
      'en': 'https://medicarebd.com',
      'bn': 'https://medicarebd.com/bn',
    },
  },
}

export default function BanglaHome() {
  return (
    <SiteShell>
      <Hero />
      <Problems />
      <Features />
      <AISection />
      <Pricing />
      <FAQ />
      <TrustSignals />
      <EarlyAccessForm />
    </SiteShell>
  )
}