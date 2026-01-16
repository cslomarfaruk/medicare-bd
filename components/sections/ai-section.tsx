// components/sections/ai-section.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { 
  Brain, 
  Eye, 
  FileText, 
  TrendingUp,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'

const aiFeatures = {
  en: [
    {
      title: 'AI patient monitoring',
      description: 'Track vitals automatically and get alerts on anomalies.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      examples: [
        'BP, sugar, heart rate tracking',
        'Risk flagging for high-risk patients',
        'Auto follow-up reminders',
      ],
    },
    {
      title: 'Smart OCR prescriptions',
      description: 'Convert handwritten Rx to digital, cut errors by 95%.',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      examples: [
        'Reads Bangla/English handwriting',
        'Detects medicine names automatically',
        'Suggests dose & timing',
      ],
    },
    {
      title: 'Visual lab reports',
      description: 'Highlight out-of-range results and visualize trends.',
      icon: FileText,
      color: 'from-emerald-500 to-green-500',
      examples: [
        'Reference range comparisons',
        'Graphical trend analysis',
        'Compare multiple tests',
      ],
    },
    {
      title: 'Clinical insights',
      description: 'Mine patient data for patterns and decision support.',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
      examples: [
        'Detect disease patterns',
        'Outcome analysis',
        'Operational efficiency reports',
      ],
    },
  ],
  bn: [
    {
      title: 'AI রোগী মনিটরিং',
      description: 'রোগীর ভাইটাল সাইন স্বয়ংক্রিয়ভাবে ট্র্যাক ও অ্যালার্ট।',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      examples: [
        'BP, Sugar, Heart Rate ট্র্যাকিং',
        'ঝুঁকিপূর্ণ রোগী শনাক্তকরণ',
        'স্বয়ংক্রিয় ফোলো-আপ রিমাইন্ডার',
      ],
    },
    {
      title: 'স্মার্ট OCR প্রেসক্রিপশন',
      description: 'হাতে লেখা প্রেসক্রিপশন সেকেন্ডে ডিজিটাল, ভুল কমে ৯৫%。',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      examples: [
        'বাংলা/ইংরেজি হাতের লেখা পড়া',
        'ঔষধের নাম স্বয়ংক্রিয় শনাক্তকরণ',
        'ডোজ ও সময় সাজেশন',
      ],
    },
    {
      title: 'ভিজ্যুয়াল ল্যাব রিপোর্ট',
      description: 'আউট-অফ-রেঞ্জ মান হাইলাইট ও ভিজ্যুয়াল ট্রেন্ড।',
      icon: FileText,
      color: 'from-emerald-500 to-green-500',
      examples: [
        'রেফারেন্স রেঞ্জ তুলনা',
        'গ্রাফিকাল ট্রেন্ড অ্যানালিসিস',
        'বিভিন্ন টেস্ট তুলনা',
      ],
    },
    {
      title: 'ক্লিনিক্যাল ইনসাইটস',
      description: 'রোগীর ডেটা বিশ্লেষণ করে সিদ্ধান্তে সহায়তা।',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
      examples: [
        'রোগের প্যাটার্ন শনাক্তকরণ',
        'চিকিৎসা ফলাফল বিশ্লেষণ',
        'ক্লিনিক দক্ষতা রিপোর্ট',
      ],
    },
  ],
}

const headerCopy = {
  en: {
    badge: 'AI intelligence',
    title1: 'Smarter care with',
    title2: 'applied AI',
    desc: 'Purpose-built AI tools tuned for Bangla + English clinical workflows.',
    examples: 'Examples',
    accuracy: 'Accuracy',
    timeSave: 'Time saved',
  },
  bn: {
    badge: 'এআই ইন্টেলিজেন্স',
    title1: 'কৃত্রিম বুদ্ধিমত্তার মাধ্যমে',
    title2: 'স্মার্ট চিকিৎসা সেবা',
    desc: 'বাংলা + ইংরেজি ওয়ার্কফ্লো মাথায় রেখে তৈরি AI টুলস।',
    examples: 'বাস্তব উদাহরণ',
    accuracy: 'সঠিকতা',
    timeSave: 'সময় সাশ্রয়',
  },
}

export default function AISection() {
  const { language } = useLanguage()
  const copy = language === 'bn' ? headerCopy.bn : headerCopy.en
  const list = language === 'bn' ? aiFeatures.bn : aiFeatures.en

  const [activeFeature, setActiveFeature] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const activeAIFeature = list[activeFeature]

  return (
    <section id="ai" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-blue-50 opacity-80" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

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
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow">
              <Brain className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.badge}</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title1}</span>
              <span className="block text-green-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title2}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.desc}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Selector */}
            <div className="space-y-4">
              {list.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-white border-2 border-blue-200 shadow-lg shadow-blue-100'
                        : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-semibold text-gray-900 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {feature.title}
                          </h3>
                          {activeFeature === index && (
                            <ChevronRight className="w-5 h-5 text-green-600 animate-pulse" />
                          )}
                        </div>
                        <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Feature Preview */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-2xl backdrop-blur">
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${activeAIFeature.color} mb-6`}>
                  <activeAIFeature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {activeAIFeature.title}
                </h3>
                
                <p className={`text-gray-700 mb-8 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {activeAIFeature.description}
                </p>

                {/* Interactive Demo */}
                <div className="space-y-4">
                  <h4 className={`font-semibold text-gray-900 flex items-center ${language === 'bn' ? 'font-bengali' : ''}`}>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                    {copy.examples}
                  </h4>
                  
                  <div className="space-y-3">
                    {activeAIFeature.examples.map((example, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center p-3 bg-white rounded-lg border border-gray-200 group hover:border-blue-300 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                        <span className={`text-gray-700 group-hover:text-gray-900 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">95%</div>
                      <div className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>{copy.accuracy}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">70%</div>
                      <div className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>{copy.timeSave}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}