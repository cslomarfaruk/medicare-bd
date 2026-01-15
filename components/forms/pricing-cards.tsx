// components/forms/pricing-cards.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  X, 
  Star,
  Zap,
  Users,
  Building2,
  Crown,
  HelpCircle
} from 'lucide-react'

const pricingPlans = [
  {
    name: "স্টার্টার",
    description: "একক চিকিৎসক বা ছোট ক্লিনিকের জন্য",
    monthlyPrice: 1999,
    yearlyPrice: 19990, // 2 months free
    color: "from-blue-500 to-cyan-500",
    icon: Users,
    features: [
      "প্রতি মাসে ২০০ রোগী পর্যন্ত",
      "বেসিক ইএমআর সিস্টেম",
      "অ্যাপয়েন্টমেন্ট ম্যানেজমেন্ট",
      "মোবাইল অ্যাপ এক্সেস",
      "ইমেইল সাপোর্ট",
      "বেসিক রিপোর্টিং"
    ],
    limitations: [
      "এআই ফিচার সীমিত",
      "কোনো কাস্টমাইজেশন নেই",
      "শুধু ১ ইউজার"
    ],
    ctaText: "বিনামূল্যে শুরু করুন",
    popular: false
  },
  {
    name: "গ্রোথ",
    description: "ছোট থেকে মাঝারি ক্লিনিকের জন্য",
    monthlyPrice: 4999,
    yearlyPrice: 47990, // 4 months free
    color: "from-emerald-500 to-green-500",
    icon: Building2,
    features: [
      "প্রতি মাসে ১০০০ রোগী পর্যন্ত",
      "সম্পূর্ণ ইএমআর সিস্টেম",
      "এআই প্রেসক্রিপশন OCR",
      "ল্যাব রিপোর্ট অ্যানালিসিস",
      "ইনভেন্টরি ম্যানেজমেন্ট",
      "৫ ইউজার পর্যন্ত",
      "প্রাইওরিটি সাপোর্ট",
      "কাস্টম রিপোর্টিং"
    ],
    limitations: [
      "উন্নত এআই সীমিত",
      "শুধু ১ ব্রাঞ্চ সমর্থন"
    ],
    ctaText: "সবচেয়ে জনপ্রিয়",
    popular: true
  },
  {
    name: "প্রো",
    description: "ডায়াগনস্টিক সেন্টার ও হাসপাতাল",
    monthlyPrice: 9999,
    yearlyPrice: 95990, // 4 months free
    color: "from-purple-500 to-pink-500",
    icon: Crown,
    features: [
      "সীমাহীন রোগী ব্যবস্থাপনা",
      "সমস্ত এআই ফিচার",
      "মাল্টি-ব্রাঞ্চ সমর্থন",
      "এডভান্সড এনালিটিক্স",
      "API এক্সেস",
      "২৫ ইউজার পর্যন্ত",
      "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার",
      "কাস্টম ডেভেলপমেন্ট",
      "ওয়ান-অন-ওয়ান ট্রেনিং"
    ],
    limitations: [],
    ctaText: "এন্টারপ্রাইজ প্ল্যান",
    popular: false
  }
]

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Star className="w-4 h-4 mr-2" />
              <span className="font-bengali">সীমিত সময় অফার</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="font-bengali">আপনার প্রতিষ্ঠানের জন্য</span>
              <span className="block text-green-600">সঠিক প্যাকেজ নির্বাচন করুন</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-bengali">
              বাংলাদেশের চিকিৎসা প্রতিষ্ঠানগুলোর জন্য বিশেষ মূল্যে। 
              <span className="text-emerald-600 font-semibold"> বছর শেষে ২০% ছাড় </span>
              সহ Early Access অফার।
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="font-bengali">মাসিক</span>
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <span className="font-bengali">বার্ষিক</span>
                  <Badge className="ml-2 px-2 py-0.5 text-xs bg-amber-500 text-white border-0">
                    <span className="font-bengali">২০% ছাড়</span>
                  </Badge>
                </div>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
              const monthlyEquivalent = billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className={`relative h-full p-8 border-2 transition-all duration-300 ${
                    plan.popular
                      ? 'border-blue-300 shadow-2xl shadow-blue-100 transform -translate-y-2'
                      : 'border-gray-200 hover:border-blue-200 hover:shadow-xl'
                  }`}>
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                          <Zap className="w-3 h-3 mr-1" />
                          <span className="font-bengali">সবচেয়ে জনপ্রিয়</span>
                        </Badge>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                        <plan.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bengali">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 font-bengali">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          ৳{price.toLocaleString('bn-BD')}
                        </span>
                        <span className="text-gray-500 ml-2 font-bengali">
                          / {billingCycle === 'monthly' ? 'মাস' : 'বছর'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-gray-500 mt-2 font-bengali">
                          <span className="line-through">৳{(plan.monthlyPrice * 12).toLocaleString('bn-BD')}</span>
                          <span className="text-emerald-600 font-semibold ml-2">
                            মাসিক ৳{monthlyEquivalent.toLocaleString('bn-BD')}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center font-bengali">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        অন্তর্ভুক্ত ফিচার
                      </h4>
                      
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-bengali">{feature}</span>
                        </div>
                      ))}

                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center font-bengali mt-6">
                            <X className="w-4 h-4 text-rose-500 mr-2" />
                            সীমাবদ্ধতা
                          </h4>
                          {plan.limitations.map((limit, idx) => (
                            <div key={idx} className="flex items-start">
                              <X className="w-5 h-5 text-rose-300 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500 font-bengali">{limit}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full h-14 text-lg font-semibold text-white ${
                        plan.popular
                          ? 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                          : 'bg-gray-900 hover:bg-black'
                      }`}
                      onClick={() => {
                        document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                        // Track pricing selection
                        window.gtag?.('event', 'select_package', {
                          package_name: plan.name,
                          price: price,
                          billing_cycle: billingCycle
                        })
                      }}
                    >
                      <span className="font-bengali">
                        {plan.ctaText}
                      </span>
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Custom Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-black text-white border-0">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold mb-2 font-bengali">
                    কাস্টম এন্টারপ্রাইজ প্ল্যান
                  </h3>
                  <p className="text-gray-300 font-bengali">
                    বড় হাসপাতাল, হেলথকেয়ার গ্রুপ বা সরকারি প্রতিষ্ঠানের জন্য বিশেষ প্ল্যান
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => {
                      // Schedule demo
                      window.gtag?.('event', 'enterprise_contact')
                    }}
                  >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    <span className="font-bengali">কাস্টম উদ্ধৃতি</span>
                  </Button>
                  <Button
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => {
                      document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className="font-bengali">আমাদের সাথে কথা বলুন</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}