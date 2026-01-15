'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { ChevronDown, HelpCircle, Shield, CreditCard, Cloud, Smartphone } from 'lucide-react'

const faqs = {
  en: [
    {
      question: 'How does MediCareBD help my clinic?',
      answer: 'We digitize every operation—registration to billing—saving 2–3 hours/day, cutting errors by 90%, and improving patient satisfaction.',
      category: 'General',
      icon: HelpCircle,
    },
    {
      question: 'How secure is my data?',
      answer: 'End-to-end encryption, backups, and role-based access aligned to Bangladesh security guidelines. Your data stays yours.',
      category: 'Security',
      icon: Shield,
    },
    {
      question: 'Pricing details?',
      answer: 'Three plans: Starter (solo), Growth (clinic), Pro (diagnostic/hospital). Early Access gets 20% lifetime discount—book a demo to lock it.',
      category: 'Pricing',
      icon: CreditCard,
    },
    {
      question: 'Works without internet?',
      answer: 'Yes. Offline mode available; data syncs when back online.',
      category: 'Technology',
      icon: Cloud,
    },
    {
      question: 'Do you have mobile apps?',
      answer: 'Yes, dedicated Android and iOS apps for doctors and patients.',
      category: 'Mobile',
      icon: Smartphone,
    },
    {
      question: 'Will my team need training?',
      answer: 'The UI is easy. We still provide free onboarding and 24/7 support.',
      category: 'Support',
      icon: HelpCircle,
    },
    {
      question: 'Can we customize?',
      answer: 'Yes. Pro plan includes custom development for your workflows.',
      category: 'Customization',
      icon: HelpCircle,
    },
    {
      question: 'Do you migrate existing data?',
      answer: 'Yes. We migrate from Excel/other tools into MediCareBD—free of charge.',
      category: 'Migration',
      icon: Cloud,
    },
  ],
  bn: [
    {
      question: 'MediCareBD কীভাবে আমার ক্লিনিকের সাহায্য করবে?',
      answer: 'রেজিস্ট্রেশন থেকে বিলিং—সব ডিজিটাল; প্রতিদিন ২-৩ ঘণ্টা সাশ্রয়, ভুল কমে ৯০%, রোগী সন্তুষ্টি বাড়ে।',
      category: 'সাধারণ',
      icon: HelpCircle,
    },
    {
      question: 'আমার ডাটা কতটা নিরাপদ?',
      answer: 'এন্ড-টু-এন্ড এনক্রিপশন, ব্যাকআপ, রোল-বেজড অ্যাক্সেস—বাংলাদেশি সিকিউরিটি গাইডলাইন অনুযায়ী।',
      category: 'সুরক্ষা',
      icon: Shield,
    },
    {
      question: 'মূল্যসূচী জানতে চাই',
      answer: '৩টি প্ল্যান: স্টার্টার, গ্রোথ, প্রো। Early Access নিলে ২০% লাইফটাইম ডিসকাউন্ট—ডেমো বুক করুন।',
      category: 'মূল্য',
      icon: CreditCard,
    },
    {
      question: 'ইন্টারনেট ছাড়া কাজ করবে?',
      answer: 'হ্যাঁ, অফলাইন মোড আছে; সংযোগ ফিরলে অটো সিঙ্ক হয়।',
      category: 'প্রযুক্তি',
      icon: Cloud,
    },
    {
      question: 'মোবাইল অ্যাপ আছে?',
      answer: 'হ্যাঁ, Android ও iOS—ডাক্তার ও রোগীর জন্য আলাদা অভিজ্ঞতা।',
      category: 'মোবাইল',
      icon: Smartphone,
    },
    {
      question: 'ট্রেনিং লাগবে?',
      answer: 'UI সহজ; তবু ফ্রি অনবোর্ডিং ও ২৪/৭ সাপোর্ট দেই।',
      category: 'সহায়তা',
      icon: HelpCircle,
    },
    {
      question: 'কাস্টমাইজেশন সম্ভব?',
      answer: 'হ্যাঁ, প্রো প্ল্যানে কাস্টম ডেভেলপমেন্ট সুবিধা আছে।',
      category: 'কাস্টমাইজেশন',
      icon: HelpCircle,
    },
    {
      question: 'ডেটা মাইগ্রেশন আছে?',
      answer: 'হ্যাঁ, এক্সেল/অন্যান্য টুল থেকে MediCareBD-তে ফ্রি মাইগ্রেশন।',
      category: 'মাইগ্রেশন',
      icon: Cloud,
    },
  ],
}

const categories = {
  en: [
    { id: 'all', name: 'All', icon: HelpCircle },
    { id: 'General', name: 'General', icon: HelpCircle },
    { id: 'Security', name: 'Security', icon: Shield },
    { id: 'Pricing', name: 'Pricing', icon: CreditCard },
    { id: 'Technology', name: 'Technology', icon: Cloud },
    { id: 'Mobile', name: 'Mobile', icon: Smartphone },
  ],
  bn: [
    { id: 'all', name: 'সব প্রশ্ন', icon: HelpCircle },
    { id: 'সাধারণ', name: 'সাধারণ', icon: HelpCircle },
    { id: 'সুরক্ষা', name: 'সুরক্ষা', icon: Shield },
    { id: 'মূল্য', name: 'মূল্য', icon: CreditCard },
    { id: 'প্রযুক্তি', name: 'প্রযুক্তি', icon: Cloud },
    { id: 'মোবাইল', name: 'মোবাইল', icon: Smartphone },
  ],
}

const headerCopy = {
  en: {
    badge: 'Frequently asked',
    title1: 'What clinics ask',
    title2: 'before switching',
    desc: 'Quick answers to the most common questions. Ask us directly if you need more.',
    still: 'Still have questions?',
    talk: 'Talk to our specialist. We respond within 24 hours.',
    call: '📞 Call us',
    email: '📧 Email us',
    demo: 'Book a demo →',
  },
  bn: {
    badge: 'সাধারণ প্রশ্ন',
    title1: 'সচরাচর জিজ্ঞাসিত',
    title2: 'প্রশ্নসমূহ',
    desc: 'সবচেয়ে বেশি করা প্রশ্নের উত্তর এখানে। আরও জানতে সরাসরি জিজ্ঞাসা করুন।',
    still: 'আরও প্রশ্ন আছে?',
    talk: 'আমাদের বিশেষজ্ঞকে জানান—২৪ ঘণ্টার মধ্যে উত্তর পাবেন।',
    call: '📞 কল করুন',
    email: '📧 ইমেইল করুন',
    demo: 'ডেমো বুক করুন →',
  },
}

export default function FAQ() {
  const { language } = useLanguage()
  const list = language === 'bn' ? faqs.bn : faqs.en
  const cats = language === 'bn' ? categories.bn : categories.en
  const copy = language === 'bn' ? headerCopy.bn : headerCopy.en

  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredFaqs = activeCategory === 'all' 
    ? list 
    : list.filter(faq => faq.category === activeCategory)

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-50 opacity-80" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6 shadow-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali font-semibold' : 'font-semibold'}>{copy.badge}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title1}</span>
              <span className="block text-green-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title2}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.desc}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {cats.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                <span className={language === 'bn' ? 'font-bengali' : ''}>{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-white/90 backdrop-blur">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-100 text-green-600 mr-4">
                        <faq.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`text-lg font-semibold text-gray-900 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="pl-12">
                            <p className={`text-gray-700 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                              {faq.answer}
                            </p>
                            {index === 0 && (
                              <button
                                onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
                                className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                              >
                                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.demo}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 shadow-sm">
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {copy.still}
              </h3>
              <p className={`text-gray-700 mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {copy.talk}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('tel:+8801700000000', '_blank')}
                  className="px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all"
                >
                  <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.call}</span>
                </button>
                <button
                  onClick={() => window.open('mailto:support@medicarebd.app', '_blank')}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.email}</span>
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}