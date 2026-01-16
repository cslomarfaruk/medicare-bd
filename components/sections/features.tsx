// components/sections/features.tsx
'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Package, 
  BarChart3,
  Shield,
  Smartphone,
  Cloud,
  Zap
} from 'lucide-react'

type FeatureItem = {
  icon: typeof Users
  title: string
  description: string
  benefits: string[]
}

type FeaturesCopy = {
  badge: string
  titleTop: string
  titleBottom: string
  sub: string
  categories: Record<string, FeatureItem[]>
  stats: { value: string; label: string; color: string }[]
  learnMore: string
}

const data = {
  en: {
    badge: 'Complete stack',
    titleTop: 'One platform',
    titleBottom: 'for every workflow',
    sub: 'Clinics, diagnostics, hospitals — everything runs from the same, secure, Bangladesh-first cloud.',
    categories: {
      Clinic: [
        {
          icon: Users,
          title: 'Patient management',
          description: 'Digital registration, history, follow-ups, and smart reminders.',
          benefits: ['Auto reminders', 'Medical history', 'Visit tracking'],
        },
        {
          icon: Calendar,
          title: 'Appointments',
          description: 'Online booking, smart scheduling, and real-time calendars.',
          benefits: ['Web/app booking', 'Auto reminders', 'No-show tracking'],
        },
        {
          icon: FileText,
          title: 'Digital prescriptions',
          description: 'Templates, drug suggestions, and print/share instantly.',
          benefits: ['Template library', 'Medicine DB', 'Digital signature'],
        },
      ],
      Operations: [
        {
          icon: CreditCard,
          title: 'Billing & invoicing',
          description: 'Automated bills, payment tracking, finance reports.',
          benefits: ['Multi-payment', 'Tax calculation', 'Real-time reports'],
        },
        {
          icon: Package,
          title: 'Inventory',
          description: 'Track medicines, stock alerts, and supplier management.',
          benefits: ['Low-stock alerts', 'Expense tracking', 'Supplier DB'],
        },
        {
          icon: BarChart3,
          title: 'Analytics',
          description: 'Performance dashboards and business insights.',
          benefits: ['Custom reports', 'Real-time dashboards', 'Financial insight'],
        },
      ],
      Technology: [
        {
          icon: Shield,
          title: 'Data protection (BD)',
          description: 'Encryption at rest, backups, role-based access aligned to local guidelines.',
          benefits: ['End-to-end encryption', 'Auto backup', 'Audit trail'],
        },
        {
          icon: Smartphone,
          title: 'Mobile apps',
          description: 'Dedicated experiences for doctors and patients.',
          benefits: ['Real-time notifications', 'Offline support', 'Quick actions'],
        },
        {
          icon: Cloud,
          title: 'Cloud-first',
          description: 'Secure cloud storage accessible from any device.',
          benefits: ['Sync across devices', 'Team collaboration', 'Scalable storage'],
        },
      ],
    },
    stats: [
      { value: '90%', label: 'Time saved', color: 'text-green-600' },
      { value: '75%', label: 'Errors reduced', color: 'text-emerald-600' },
      { value: '40%', label: 'Revenue uplift', color: 'text-purple-600' },
      { value: '99%', label: 'Patient satisfaction', color: 'text-amber-600' },
    ],
    learnMore: 'Learn more',
  },
  bn: {
    badge: 'সম্পূর্ণ সমাধান',
    titleTop: 'এক প্ল্যাটফর্মে',
    titleBottom: 'সব প্রয়োজনীয় ফিচার',
    sub: 'ক্লিনিক, ডায়াগনস্টিক, হাসপাতাল—সব অপারেশন একই নিরাপদ, বাংলাদেশ-প্রথম ক্লাউডে।',
    categories: {
      ক্লিনিক: [
        {
          icon: Users,
          title: 'রোগী ব্যবস্থাপনা',
          description: 'ডিজিটাল রেজিস্ট্রেশন, হিস্ট্রি, ফলো-আপ ও স্মার্ট রিমাইন্ডার।',
          benefits: ['স্বয়ংক্রিয় রিমাইন্ডার', 'মেডিকেল হিস্ট্রি', 'ভিজিট ট্র্যাকিং'],
        },
        {
          icon: Calendar,
          title: 'অ্যাপয়েন্টমেন্ট',
          description: 'অনলাইন বুকিং, স্মার্ট সিডিউলিং ও রিয়েল-টাইম ক্যালেন্ডার।',
          benefits: ['ওয়েব/অ্যাপ বুকিং', 'অটো রিমাইন্ডার', 'নো-শো ট্র্যাকিং'],
        },
        {
          icon: FileText,
          title: 'ডিজিটাল প্রেসক্রিপশন',
          description: 'টেমপ্লেট, ড্রাগ সাজেশন, প্রিন্ট/শেয়ার।',
          benefits: ['টেমপ্লেট লাইব্রেরি', 'মেডিসিন DB', 'ডিজিটাল সই'],
        },
      ],
      ব্যবস্থাপনা: [
        {
          icon: CreditCard,
          title: 'বিলিং ও ইনভয়েস',
          description: 'অটো বিলিং, পেমেন্ট ট্র্যাকিং, ফাইন্যান্স রিপোর্ট।',
          benefits: ['মাল্টি-পেমেন্ট', 'ট্যাক্স ক্যালকুলেশন', 'রিয়েল-টাইম রিপোর্ট'],
        },
        {
          icon: Package,
          title: 'ইনভেন্টরি',
          description: 'ঔষধ/সাপ্লাই ট্র্যাকিং, স্টক অ্যালার্ট, সাপ্লায়ার ম্যানেজমেন্ট।',
          benefits: ['লো স্টক অ্যালার্ট', 'ব্যয় ট্র্যাকিং', 'সাপ্লায়ার DB'],
        },
        {
          icon: BarChart3,
          title: 'বিশ্লেষণ',
          description: 'ড্যাশবোর্ড, রিপোর্ট ও বিজনেস ইনসাইট।',
          benefits: ['কাস্টম রিপোর্ট', 'রিয়েল-টাইম ড্যাশবোর্ড', 'ফাইন্যান্সিয়াল ইনসাইট'],
        },
      ],
      প্রযুক্তি: [
        {
          icon: Shield,
          title: 'ডাটা সুরক্ষা (BD)',
          description: 'এনক্রিপশন, ব্যাকআপ, রোল-বেজড অ্যাক্সেস—বাংলাদেশি গাইডলাইনসম্মত।',
          benefits: ['এন্ড-টু-এন্ড এনক্রিপশন', 'অটো ব্যাকআপ', 'অডিট ট্রেইল'],
        },
        {
          icon: Smartphone,
          title: 'মোবাইল অ্যাপ',
          description: 'ডাক্তার ও রোগীর জন্য আলাদা অভিজ্ঞতা।',
          benefits: ['রিয়েল-টাইম নোটিফিকেশন', 'অফলাইন সাপোর্ট', 'কুইক অ্যাকশন'],
        },
        {
          icon: Cloud,
          title: 'ক্লাউড স্টোরেজ',
          description: 'নিরাপদ ক্লাউড, যে কোন ডিভাইস থেকে অ্যাক্সেস।',
          benefits: ['সিঙ্ক অ্যাক্রস ডিভাইস', 'টিম কলাবোরেশন', 'স্কেলেবল স্টোরেজ'],
        },
      ],
    },
    stats: [
      { value: '৯০%', label: 'সময় সাশ্রয়', color: 'text-green-600' },
      { value: '৭৫%', label: 'ভুল কমে', color: 'text-emerald-600' },
      { value: '৪০%', label: 'আয় বৃদ্ধি', color: 'text-purple-600' },
      { value: '৯৯%', label: 'সন্তুষ্ট রোগী', color: 'text-amber-600' },
    ],
    learnMore: 'বিস্তারিত জানুন',
  },
}

export default function Features() {
  const { language } = useLanguage()
  const copy: FeaturesCopy = language === 'bn' ? data.bn : data.en

  const categoriesKeys = useMemo(() => Object.keys(copy.categories), [copy])
  const [activeCategory, setActiveCategory] = useState<string>(categoriesKeys[0])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 opacity-80" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6 shadow-sm">
              <Zap className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali font-semibold' : 'font-semibold'}>
                {copy.badge}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.titleTop}</span>
              <span className="block text-green-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.titleBottom}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.sub}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-gray-100 p-1 shadow-sm">
              {categoriesKeys.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className={language === 'bn' ? 'font-bengali' : ''}>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy?.categories[activeCategory as keyof typeof copy.categories]?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group bg-white/90 backdrop-blur">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`text-gray-600 mb-6 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                        <span className={language === 'bn' ? 'font-bengali' : ''}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className={`text-green-600 hover:text-blue-700 text-sm font-semibold flex items-center ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {copy.learnMore}
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {copy.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className={`text-gray-700 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
