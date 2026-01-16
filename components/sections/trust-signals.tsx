// components/sections/trust-signals.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { 
  Shield, 
  Lock, 
  Globe, 
  Award, 
  Users, 
  Clock,
  CheckCircle2,
  BadgeCheck
} from 'lucide-react'

const trustSignals = {
  en: [
    {
      icon: Shield,
      title: 'BD data protection',
      description: 'Encryption, backups, and access controls aligned to Bangladesh guidelines.',
      color: 'text-green-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Lock,
      title: 'End-to-end encryption',
      description: '256-bit encryption at rest and in transit.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: Globe,
      title: 'Bangladesh-first hosting',
      description: 'Data stays on reputable cloud in-region for performance and compliance.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Award,
      title: 'ISO-grade processes',
      description: 'Security and reliability practices modeled on ISO 27001 standards.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      icon: Users,
      title: '500+ happy clinicians',
      description: 'Trusted by leading clinics and diagnostics in Bangladesh.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      icon: Clock,
      title: '24/7 support',
      description: 'Round-the-clock technical assistance when you need it.',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
  ],
  bn: [
    {
      icon: Shield,
      title: 'বাংলাদেশি ডাটা সুরক্ষা',
      description: 'এনক্রিপশন, ব্যাকআপ ও অ্যাক্সেস কন্ট্রোল—বাংলাদেশ গাইডলাইন অনুযায়ী।',
      color: 'text-green-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Lock,
      title: 'এন্ড-টু-এন্ড এনক্রিপশন',
      description: '256-bit এনক্রিপশন at rest ও in transit।',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: Globe,
      title: 'বাংলাদেশ-ফার্স্ট হোস্টিং',
      description: 'রেপুটেড ক্লাউড, রিজিওনাল ডাটা রেসিডেন্সি ও পারফরমেন্স।',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Award,
      title: 'ISO-মানের প্রক্রিয়া',
      description: 'ISO 27001 নির্দেশনা অনুযায়ী নিরাপত্তা ও রিলায়েবিলিটি।',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      icon: Users,
      title: '৫০০+ সন্তুষ্ট ক্লিনিশিয়ান',
      description: 'বাংলাদেশের শীর্ষ ক্লিনিক ও ডায়াগনস্টিকের আস্থা।',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      icon: Clock,
      title: '২৪/৭ সাপোর্ট',
      description: 'প্রয়োজনে যেকোন সময় টেকনিক্যাল সহায়তা।',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
  ],
}

const headerCopy = {
  en: {
    badge: 'Why teams trust us',
    title1: 'Why 500+ clinicians',
    title2: 'choose Managemed',
    sub: 'More than software—reliable infrastructure, security, and support.',
    cta: 'Start your transformation',
    ctaSub: 'Join the first AI-powered medical platform built for Bangladesh.',
    perks: ['Free demo', '20% lifetime discount (EA)', 'Free onboarding'],
    note: 'Managemed follows Bangladesh medical data and security guidelines.',
    offer: 'Limited offer for first 100 customers',
  },
  bn: {
    badge: 'আমাদের বিশ্বাস করুন',
    title1: 'কেন ৫০০+ চিকিৎসক',
    title2: 'আমাদের বেছে নেন',
    sub: 'শুধু সফটওয়্যার নয়—বিশ্বাসযোগ্য অবকাঠামো, সিকিউরিটি ও সাপোর্ট।',
    cta: 'ডিজিটাল রূপান্তর শুরু করুন',
    ctaSub: 'বাংলাদেশের জন্য তৈরি প্রথম AI-পাওয়ারড মেডিকেল প্ল্যাটফর্মে যোগ দিন।',
    perks: ['বিনামূল্যে ডেমো', '২০% লাইফটাইম ডিসকাউন্ট (EA)', 'ফ্রি অনবোর্ডিং'],
    note: 'Managemed বাংলাদেশি মেডিকেল ডাটা ও সিকিউরিটি গাইডলাইন মেনে চলে।',
    offer: 'প্রথম ১০০ জনের জন্য সীমিত অফার',
  },
}

export default function TrustSignals() {
  const { language } = useLanguage()
  const copy = language === 'bn' ? headerCopy.bn : headerCopy.en
  const signals = language === 'bn' ? trustSignals.bn : trustSignals.en

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-emerald-50 to-blue-50 opacity-80" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white mb-6 shadow-sm">
              <BadgeCheck className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali font-semibold' : 'font-semibold'}>{copy.badge}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title1}</span>
              <span className="block text-emerald-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title2}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.sub}
            </p>
          </div>

          {/* Trust Signals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {signals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur">
                  <div className={`inline-flex p-3 rounded-xl ${signal.bg} mb-4`}>
                    <signal.icon className={`w-6 h-6 ${signal.color}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {signal.title}
                  </h3>
                  
                  <p className={`text-gray-600 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {signal.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative overflow-hidden rounded-3xl shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-purple-600 to-cyan-600 opacity-90"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div className="relative p-8 md:p-12 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-8 lg:mb-0 lg:mr-8">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {copy.cta}
                  </h3>
                  <p className={`text-blue-100 mb-6 max-w-2xl ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {copy.ctaSub}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {copy.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-300 mr-2" />
                        <span className={language === 'bn' ? 'font-bengali' : ''}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button
                    onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                  >
                    <span className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আগাম অ্যাক্সেস নিন' : 'Get early access'}</span>
                  </button>
                  <p className={`text-sm text-blue-200 mt-3 text-center ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {copy.offer}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className={`text-gray-500 text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.note}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}