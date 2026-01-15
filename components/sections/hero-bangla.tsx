// components/sections/hero-bangla.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Monitor, Shield, Zap, CheckCircle, Star } from 'lucide-react'

export default function HeroBangla() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-80 h-80 bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2.5 border-blue-200 bg-white/50 backdrop-blur-sm text-blue-700 shadow-sm"
              >
                <Star className="w-4 h-4 mr-2" />
                <span className="font-bengali">বাংলাদেশের ৫০০+ চিকিৎসকের বিশ্বাস</span>
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug">
              <span className="block text-gray-900 font-bengali mb-2">
                আপনার চিকিৎসা প্রতিষ্ঠানের
              </span>
              <span className="block mt-2 bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent font-bengali">
                সম্পূর্ণ ডিজিটাল রূপান্তর
                <span className="text-emerald-500">.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-bengali leading-8"
            >
              বাংলাদেশের প্রথম এআই-পাওয়ারড ক্লিনিক ম্যানেজমেন্ট সফটওয়্যার। 
              রোগী ব্যবস্থাপনা, বিলিং, ইনভেন্টরি থেকে এআই-রিপোর্ট বিশ্লেষণ - সবকিছু এক প্ল্যাটফর্মে।
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg bg-gradient-to-r from-green-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-bengali">বিনামূল্যে ডেমো দেখুন</span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 text-lg border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Monitor className="w-5 h-5 mr-2" />
                <span className="font-bengali">সমস্ত ফিচার দেখুন</span>
              </Button>
            </motion.div>

            {/* Key Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: CheckCircle,
                  text: 'প্রতিদিন ২+ ঘণ্টা সময় সাশ্রয়',
                  color: "text-emerald-600",
                  bg: "bg-emerald-50/80 backdrop-blur-sm"
                },
                {
                  icon: Shield,
                  text: 'রোগীর তথ্য ১০০% সুরক্ষিত',
                  color: "text-green-600",
                  bg: "bg-blue-50/80 backdrop-blur-sm"
                },
                {
                  icon: Zap,
                  text: 'এআই সহায়তায় দ্রুত সিদ্ধান্ত',
                  color: "text-amber-600",
                  bg: "bg-amber-50/80 backdrop-blur-sm"
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={`${benefit.bg} rounded-xl p-5 flex items-center justify-center space-x-3 border border-white/50 shadow-sm`}
                >
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                  <span className="font-semibold text-gray-800 font-bengali">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}