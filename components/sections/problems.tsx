// components/sections/problems.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Clock, DollarSign, FileText, Users, ShieldOff } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

const content = {
  en: {
    badge: 'Spot the bottlenecks',
    headingTop: 'Where clinics in Bangladesh',
    headingBottom: 'lose time and revenue',
    sub: 'We see these every day — and we’ve built fixes for each.',
    impactLabel: 'Impact',
    cta: 'See the solution',
    ctaSub: 'Cut 90% of the friction with Managemed',
    problems: [
      {
        icon: Clock,
        title: 'Wasted hours',
        description: '2–3 hours lost daily to manual registers and paperwork.',
        impact: '60+ hours lost every month',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      },
      {
        icon: FileText,
        title: 'Missing records',
        description: 'Paper prescriptions go missing; history is hard to retrieve.',
        impact: 'Up to 20% patient history gaps',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
      },
      {
        icon: DollarSign,
        title: 'Revenue leakage',
        description: 'Manual billing errors and overdue payments slip through.',
        impact: '15–20% monthly revenue lost',
        color: 'text-red-600',
        bg: 'bg-red-50',
      },
      {
        icon: Users,
        title: 'Staff scheduling chaos',
        description: 'Duty rosters conflict; productivity drops.',
        impact: '30% lower productivity',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        icon: ShieldOff,
        title: 'Data protection risk',
        description: 'Files can be lost or copied; no reliable backups.',
        impact: 'Patient privacy at risk',
        color: 'text-gray-600',
        bg: 'bg-gray-50',
      },
      {
        icon: AlertTriangle,
        title: 'Clinical errors',
        description: 'Handwriting misread; drug interactions not checked.',
        impact: 'Higher risk of treatment errors',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      },
    ],
  },
  bn: {
    badge: 'সমস্যা চিহ্নিত করুন',
    headingTop: 'বাংলাদেশের চিকিৎসকরা',
    headingBottom: 'কোন সমস্যায় ভোগেন?',
    sub: 'প্রতিদিন এসব সমস্যা দেখা যায়—প্রতিটির সমাধান আমরা করেছি।',
    impactLabel: 'প্রভাব',
    cta: 'সমাধান দেখুন',
    ctaSub: 'Managemed দিয়ে ৯০% ঝামেলা কমিয়ে আনুন',
    problems: [
      {
        icon: Clock,
        title: 'সময়ের অপচয়',
        description: 'হাতে লিখে রোগীর তথ্য রাখতে দিনে ২-৩ ঘণ্টা নষ্ট হয়।',
        impact: 'মাসে ৬০+ ঘণ্টা হারানো সময়',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      },
      {
        icon: FileText,
        title: 'নথি হারানো',
        description: 'কাগজের ফাইলে প্রেসক্রিপশন হারায়, রোগীর হিস্ট্রি খুঁজে পাওয়া কঠিন।',
        impact: '২০% রোগীর তথ্য হারিয়ে যায়',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
      },
      {
        icon: DollarSign,
        title: 'আর্থিক ক্ষতি',
        description: 'ম্যানুয়াল বিলিং ভুল, ওভারডিউ পেমেন্ট ট্র্যাক হয় না।',
        impact: 'মাসিক ১৫-২০% রাজস্ব ক্ষতি',
        color: 'text-red-600',
        bg: 'bg-red-50',
      },
      {
        icon: Users,
        title: 'স্টাফ ম্যানেজমেন্ট ঝামেলা',
        description: 'ডিউটি রোস্টার কনফ্লিক্ট, প্রোডাক্টিভিটি কমে যায়।',
        impact: 'স্টাফ প্রোডাক্টিভিটি ৩০% কম',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        icon: ShieldOff,
        title: 'ডাটা সুরক্ষা ঝুঁকি',
        description: 'কাগজের ফাইল চুরি/নষ্ট হওয়ার ঝুঁকি, ব্যাকআপ নেই।',
        impact: 'রোগীর গোপনীয়তা ঝুঁকিতে',
        color: 'text-gray-600',
        bg: 'bg-gray-50',
      },
      {
        icon: AlertTriangle,
        title: 'চিকিৎসা ভুল',
        description: 'হাতে লেখা প্রেসক্রিপশন ভুল পড়া, ড্রাগ ইন্টারঅ্যাকশন চেক না করা।',
        impact: 'চিকিৎসা ভুলের উচ্চ ঝুঁকি',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      },
    ],
  },
}

export default function Problems() {
  const { language } = useLanguage()
  const copy = language === 'bn' ? content.bn : content.en

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="problems" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 opacity-70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-rose-700 mb-6 shadow-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali font-semibold' : 'font-semibold'}>
                {copy.badge}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.headingTop}</span>
              <span className="block text-rose-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.headingBottom}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.sub}
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy.problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:border-rose-200 bg-white/90 backdrop-blur">
                  <div className={`inline-flex p-3 rounded-xl ${problem.bg} mb-4`}>
                    <problem.icon className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {problem.title}
                  </h3>
                  
                  <p className={`text-gray-600 mb-4 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {problem.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className={`text-sm font-semibold text-gray-500 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {copy.impactLabel}:
                    </div>
                    <div className={`text-lg font-bold ${problem.color} ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {problem.impact}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Solution Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {copy.ctaSub}
                </h3>
                <p className={`text-gray-700 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  Managemed
                </p>
              </div>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.cta}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}