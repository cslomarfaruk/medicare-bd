// components/sections/pricing.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/language-context'
import { 
  Check, 
  X, 
  Star,
  Zap,
  Users,
  Building2,
  Crown,
  HelpCircle,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react'

const pricingPlans = {
  en: [
    {
      name: 'Starter',
      description: 'Solo doctor or small clinic',
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      color: 'from-blue-500 to-cyan-500',
      icon: Users,
      features: [
        'Up to 200 patients/month',
        'Basic EMR',
        'Appointment management',
        'Mobile app access',
        'Email support',
        'Basic reporting',
        '1 user license',
      ],
      limitations: ['Limited AI features', 'No customization', 'Single branch only'],
      ctaText: 'Start free',
      popular: false,
      bestFor: 'Freelance doctors',
    },
    {
      name: 'Growth',
      description: 'Small to mid-size clinics',
      monthlyPrice: 4999,
      yearlyPrice: 47990,
      color: 'from-emerald-500 to-green-500',
      icon: Building2,
      features: [
        'Up to 1000 patients/month',
        'Full EMR',
        'AI Rx OCR',
        'Lab report analysis',
        'Inventory management',
        'Up to 5 users',
        'Priority support',
        'Custom reporting',
        'Multi-device access',
      ],
      limitations: ['Advanced AI limited', 'Limited API access'],
      ctaText: 'Most popular',
      popular: true,
      bestFor: 'Clinics & diagnostics',
    },
    {
      name: 'Pro',
      description: 'Diagnostics and hospitals',
      monthlyPrice: 9999,
      yearlyPrice: 95990,
      color: 'from-purple-500 to-pink-500',
      icon: Crown,
      features: [
        'Unlimited patients',
        'All AI features unlocked',
        'Multi-branch support',
        'Advanced analytics',
        'Full API access',
        'Up to 25 users',
        'Dedicated account manager',
        'Custom development',
        '1:1 training',
        'White-label option',
      ],
      limitations: [],
      ctaText: 'Enterprise plan',
      popular: false,
      bestFor: 'Hospitals & large diagnostics',
    },
  ],
  bn: [
    {
      name: 'স্টার্টার',
      description: 'একক চিকিৎসক বা ছোট ক্লিনিক',
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      color: 'from-blue-500 to-cyan-500',
      icon: Users,
      features: [
        'প্রতি মাসে ২০০ রোগী পর্যন্ত',
        'বেসিক ইএমআর',
        'অ্যাপয়েন্টমেন্ট ম্যানেজমেন্ট',
        'মোবাইল অ্যাপ এক্সেস',
        'ইমেইল সাপোর্ট',
        'বেসিক রিপোর্টিং',
        '১ ইউজার লাইসেন্স',
      ],
      limitations: ['এআই ফিচার সীমিত', 'কোনো কাস্টমাইজেশন নেই', 'শুধু ১ ব্রাঞ্চ'],
      ctaText: 'বিনামূল্যে শুরু করুন',
      popular: false,
      bestFor: 'ফ্রিল্যান্স ডাক্তার',
    },
    {
      name: 'গ্রোথ',
      description: 'ছোট থেকে মাঝারি ক্লিনিক',
      monthlyPrice: 4999,
      yearlyPrice: 47990,
      color: 'from-emerald-500 to-green-500',
      icon: Building2,
      features: [
        'প্রতি মাসে ১০০০ রোগী পর্যন্ত',
        'সম্পূর্ণ ইএমআর',
        'এআই প্রেসক্রিপশন OCR',
        'ল্যাব রিপোর্ট অ্যানালিসিস',
        'ইনভেন্টরি ম্যানেজমেন্ট',
        '৫ ইউজার পর্যন্ত',
        'প্রাইওরিটি সাপোর্ট',
        'কাস্টম রিপোর্টিং',
        'মাল্টি-ডিভাইস অ্যাক্সেস',
      ],
      limitations: ['উন্নত এআই সীমিত', 'সীমিত API অ্যাক্সেস'],
      ctaText: 'সবচেয়ে জনপ্রিয়',
      popular: true,
      bestFor: 'ক্লিনিক ও ডায়াগনস্টিক',
    },
    {
      name: 'প্রো',
      description: 'ডায়াগনস্টিক ও হাসপাতাল',
      monthlyPrice: 9999,
      yearlyPrice: 95990,
      color: 'from-purple-500 to-pink-500',
      icon: Crown,
      features: [
        'সীমাহীন রোগী ব্যবস্থাপনা',
        'সমস্ত এআই ফিচার আনলিমিটেড',
        'মাল্টি-ব্রাঞ্চ সমর্থন',
        'এডভান্সড এনালিটিক্স',
        'ফুল API এক্সেস',
        '২৫ ইউজার পর্যন্ত',
        'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার',
        'কাস্টম ডেভেলপমেন্ট',
        'ওয়ান-অন-ওয়ান ট্রেনিং',
        'হোয়াইট-লেবেল অপশন',
      ],
      limitations: [],
      ctaText: 'এন্টারপ্রাইজ প্ল্যান',
      popular: false,
      bestFor: 'হাসপাতাল ও লার্জ ডায়াগনস্টিক',
    },
  ],
}

const includedFeatures = {
  en: [
    { icon: Shield, text: 'End-to-end encryption' },
    { icon: Clock, text: '99.9% uptime SLA' },
    { icon: TrendingUp, text: 'Regular updates' },
    { icon: Users, text: 'Onboarding & basics' },
  ],
  bn: [
    { icon: Shield, text: 'এন্ড-টু-এন্ড এনক্রিপশন' },
    { icon: Clock, text: '৯৯.৯% আপটাইম' },
    { icon: TrendingUp, text: 'নিয়মিত আপডেট' },
    { icon: Users, text: 'অনবোর্ডিং ও বেসিক ট্রেনিং' },
  ],
}

const headerCopy = {
  en: {
    limited: 'Limited-time offer',
    title1: 'Simple, transparent',
    title2: 'pricing for Bangladesh',
    desc: 'Early Access: lock 20% lifetime discount for annual plans.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    off: '20% off',
    features: 'Included features',
    limits: 'Limitations',
    allPlans: 'Included in every plan',
    enterprise: 'Custom enterprise plan',
    enterpriseDesc: 'For hospitals, groups, govt/NGO initiatives.',
    customQuote: 'Custom quote',
    talk: 'Talk to us',
    guarantee: '30-day money-back guarantee',
    guaranteeDesc: 'Full refund in the first 30 days if you’re not satisfied.',
  },
  bn: {
    limited: 'সীমিত সময় অফার',
    title1: 'সহজ ও স্বচ্ছ',
    title2: 'মূল্য বাংলাদেশি প্রতিষ্ঠানের জন্য',
    desc: 'Early Access নিলে বার্ষিক প্ল্যানে ২০% লাইফটাইম ডিসকাউন্ট।',
    monthly: 'মাসিক',
    yearly: 'বার্ষিক',
    off: '২০% ছাড়',
    features: 'অন্তর্ভুক্ত ফিচার',
    limits: 'সীমাবদ্ধতা',
    allPlans: 'সব প্ল্যানে যা থাকছে',
    enterprise: 'কাস্টম এন্টারপ্রাইজ প্ল্যান',
    enterpriseDesc: 'হাসপাতাল, গ্রুপ, সরকারি/এনজিও উদ্যোগের জন্য।',
    customQuote: 'কাস্টম উদ্ধৃতি',
    talk: 'আমাদের সাথে কথা বলুন',
    guarantee: '৩০ দিনের মানি-ব্যাক গ্যারান্টি',
    guaranteeDesc: 'প্রথম ৩০ দিনের মধ্যে সন্তুষ্ট না হলে ফুল রিফান্ড।',
  },
}

export default function Pricing() {
  const { language } = useLanguage()
  const copy = language === 'bn' ? headerCopy.bn : headerCopy.en
  const plans = language === 'bn' ? pricingPlans.bn : pricingPlans.en
  const included = language === 'bn' ? includedFeatures.bn : includedFeatures.en

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 opacity-80" />
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
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Star className="w-4 h-4 mr-2" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.limited}</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title1}</span>
              <span className="block text-blue-600">
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.title2}</span>
              </span>
            </h2>
            
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.desc}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-12 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.monthly}</span>
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
                  <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.yearly}</span>
                  <Badge className="ml-2 px-2 py-0.5 text-xs bg-amber-500 text-white border-0">
                    <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.off}</span>
                  </Badge>
                </div>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
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
                  className="relative"
                >
                  <Card className={`relative h-full p-8 border-2 transition-all duration-300 bg-white/90 backdrop-blur ${
                    plan.popular
                      ? 'border-blue-300 shadow-2xl shadow-blue-100 transform -translate-y-2'
                      : 'border-gray-200 hover:border-blue-200 hover:shadow-xl'
                  }`}>
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                          <Zap className="w-3 h-3 mr-1" />
                          <span className={language === 'bn' ? 'font-bengali' : ''}>{plan.ctaText}</span>
                        </Badge>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                        <plan.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-gray-600 ${language === 'bn' ? 'font-bengali' : ''} mb-4`}>
                        {plan.description}
                      </p>
                      <div className="inline-block px-3 py-1 bg-gray-100 rounded-full">
                        <span className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {plan.bestFor}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          ৳{price.toLocaleString('bn-BD')}
                        </span>
                        <span className={`text-gray-500 ml-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          / {billingCycle === 'monthly' ? (language === 'bn' ? 'মাস' : 'mo') : (language === 'bn' ? 'বছর' : 'yr')}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className={`text-sm text-gray-500 mt-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          <span className="line-through">৳{(plan.monthlyPrice * 12).toLocaleString('bn-BD')}</span>
                          <span className="text-emerald-600 font-semibold ml-2">
                            {language === 'bn' ? 'মাসিক' : 'Monthly'} ৳{monthlyEquivalent.toLocaleString('bn-BD')}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <h4 className={`font-semibold text-gray-900 mb-3 flex items-center ${language === 'bn' ? 'font-bengali' : ''}`}>
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        {copy.features}
                      </h4>
                      
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={`text-gray-700 ${language === 'bn' ? 'font-bengali' : ''}`}>{feature}</span>
                        </div>
                      ))}

                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className={`font-semibold text-gray-900 mb-3 flex items-center mt-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            <X className="w-4 h-4 text-rose-500 mr-2" />
                            {copy.limits}
                          </h4>
                          {plan.limitations.map((limit, idx) => (
                            <div key={idx} className="flex items-start">
                              <X className="w-5 h-5 text-rose-300 mr-3 flex-shrink-0 mt-0.5" />
                              <span className={`text-gray-500 ${language === 'bn' ? 'font-bengali' : ''}`}>{limit}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full h-14 text-lg font-semibold text-white ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                          : 'bg-gray-900 hover:bg-black'
                      }`}
                      onClick={() => {
                        document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                        window.gtag?.('event', 'select_package', {
                          package_name: plan.name,
                          price: price,
                          billing_cycle: billingCycle,
                        })
                      }}
                    >
                      <span className={language === 'bn' ? 'font-bengali' : ''}>
                        {plan.popular ? plan.ctaText : (language === 'bn' ? plan.ctaText : 'Choose plan')}
                      </span>
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* All Plans Include */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 shadow-sm">
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 text-center ${language === 'bn' ? 'font-bengali' : ''}`}>
                {copy.allPlans}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {included.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-white border border-blue-200 mb-3">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className={`text-gray-700 ${language === 'bn' ? 'font-bengali' : ''}`}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Custom Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-black text-white border-0 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className={`text-2xl font-bold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {copy.enterprise}
                  </h3>
                  <p className={`text-gray-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {copy.enterpriseDesc}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 mr-2" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'সীমাহীন ইউজার' : 'Unlimited users'}</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 mr-2" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'কাস্টম ডেভেলপমেন্ট' : 'Custom development'}</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 mr-2" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'ডেডিকেটেড সার্ভার' : 'Dedicated servers'}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => {
                      window.gtag?.('event', 'enterprise_contact')
                    }}
                  >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.customQuote}</span>
                  </Button>
                  <Button
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => {
                      document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className={language === 'bn' ? 'font-bengali' : ''}>{copy.talk}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-full shadow-sm">
              <Shield className="w-5 h-5 text-emerald-600 mr-2" />
              <span className={`text-emerald-700 font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                {copy.guarantee}
              </span>
            </div>
            <p className={`text-gray-600 mt-4 max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {copy.guaranteeDesc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}