// contexts/language-context.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type Language = 'en' | 'bn'

// Minimal UI dictionaries for client-side translations used in header/hero/etc.
const uiDictionaries = {
  en: {
    nav: {
      features: 'Features',
      ai: 'AI',
      how: 'How it works',
      pricing: 'Pricing',
      faq: 'FAQ',
    },
    hero: {
      title1: 'Complete Digital Transformation',
      title2: 'for Your Medical Practice',
      subtitle:
        "Bangladesh's first AI-powered clinic management software. Everything from patient management to AI analytics in one platform.",
      demo: 'Get Free Demo',
      viewFeatures: 'View All Features',
    },
    trust: {
      '500': 'Trusted by 500+ Doctors in Bangladesh',
    },
    problems: {
      timeWaste: 'Save 2+ hours every day by removing manual paperwork',
      documents: 'Never lose prescriptions or treatment history again',
    },
  },
  bn: {
    nav: {
      features: 'ফিচারসমূহ',
      ai: 'এআই সুবিধা',
      how: 'কিভাবে কাজ করে',
      pricing: 'মূল্যসূচী',
      faq: 'সাধারণ প্রশ্ন',
    },
    hero: {
      title1: 'আপনার চিকিৎসা প্রতিষ্ঠানের',
      title2: 'সম্পূর্ণ ডিজিটাল রূপান্তর',
      subtitle:
        'বাংলাদেশের প্রথম এআই-পাওয়ারড ক্লিনিক ম্যানেজমেন্ট সফটওয়্যার। রোগী ব্যবস্থাপনা, বিলিং, ইনভেন্টরি থেকে এআই-রিপোর্ট বিশ্লেষণ - সবকিছু এক প্ল্যাটফর্মে।',
      demo: 'বিনামূল্যে ডেমো দেখুন',
      viewFeatures: 'সমস্ত ফিচার দেখুন',
    },
    trust: {
      '500': 'বাংলাদেশের ৫০০+ চিকিৎসকের বিশ্বাস',
    },
    problems: {
      timeWaste: 'প্রতিদিন ২+ ঘণ্টা সময় সাশ্রয় করুন',
      documents: 'আর কখনো রোগীর প্রেসক্রিপশন বা হিস্ট্রি হারাবে না',
    },
  },
} as const

type UIDictionary = (typeof uiDictionaries)[Language]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLanguage = 'en' 
}: { 
  children: React.ReactNode 
  initialLanguage?: Language 
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [dictionary, setDictionary] = useState<UIDictionary>(
    uiDictionaries[initialLanguage]
  )
  const pathname = usePathname()

  useEffect(() => {
    // Detect language from URL
    if (pathname?.startsWith('/bn')) {
      setLanguageState('bn')
      setDictionary(uiDictionaries.bn)
    } else {
      setLanguageState('en')
      setDictionary(uiDictionaries.en)
    }
  }, [pathname])

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang)
    setDictionary(uiDictionaries[newLang])
    localStorage.setItem('medico_language', newLang)
    document.cookie = `preferred_language=${newLang}; path=/; max-age=31536000`

    // Navigate to language-specific page
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname || '/'
      if (newLang === 'bn') {
        // ensure we are on /bn + current path (without double slashes)
        const normalized = currentPath.startsWith('/bn') ? currentPath : `/bn${currentPath === '/' ? '' : currentPath}`
        window.location.href = normalized
      } else {
        // strip leading /bn for English
        const normalized = currentPath.startsWith('/bn') ? currentPath.replace(/^\/bn/, '') || '/' : currentPath || '/'
        window.location.href = normalized
      }
    }
  }

  const t = (key: string): string => {
    const parts = key.split('.')
    let current: any = dictionary

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part]
      } else {
        return key
      }
    }

    return typeof current === 'string' ? current : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
