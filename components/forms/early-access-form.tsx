'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  Clock,
  Users,
  Phone
} from 'lucide-react'
import toast from 'react-hot-toast'
import { submitLeadForm } from '@/app/actions/lead-actions'
import { useLanguage } from '@/contexts/language-context'
import dynamic from 'next/dynamic'

// Dynamically import motion components to avoid SSR issues
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)


const formSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে'),
  email: z.string().email('সঠিক ইমেইল দিন').optional(),
  phone: z.string().min(11, 'সঠিক মোবাইল নম্বর দিন').optional(),
  role: z.enum([
    'DOCTOR',
    'CLINIC_OWNER',
    'DIAGNOSTIC_CENTER_OWNER',
    'HOSPITAL_ADMIN',
    'DENTIST',
    'PHARMACIST',
    'MEDICAL_STUDENT',
    'OTHER'
  ]),
  company: z.string().optional(),
  organizationSize: z.enum([
    'INDIVIDUAL',
    'SMALL_2_10',
    'MEDIUM_11_50',
    'LARGE_51_PLUS'
  ]).optional(),
  message: z.string().max(500, 'মেসেজ ৫০০ অক্ষরের মধ্যে হতে হবে').optional(),
})
.superRefine((data, ctx) => {
  if (!data.email && !data.phone) {
    ctx.addIssue({
      code: 'custom',
      message: 'অনুগ্রহ করে ইমেইল বা মোবাইল নম্বর প্রদান করুন',
      path: ['email'],
    })
    ctx.addIssue({
      code: 'custom',
      message: 'অনুগ্রহ করে ইমেইল বা মোবাইল নম্বর প্রদান করুন',
      path: ['phone'],
    })
  }
})

type FormData = z.infer<typeof formSchema>

export default function EarlyAccessForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [sessionId] = useState(() => crypto.randomUUID())
  const { language } = useLanguage()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'DOCTOR',
      organizationSize: 'INDIVIDUAL'
    }
  })

  const selectedRole = watch('role')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString())
      })
      
      // Add tracking data
      formData.append('sessionId', sessionId)
      formData.append('landingPage', window.location.pathname)
      formData.append('screenSize', `${window.innerWidth}x${window.innerHeight}`)
      
      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          formData.append(key, value)
        }
      })

      const result = await submitLeadForm(formData)
      
      if (result.success) {
        setIsSuccess(true)
        toast.success(result.message)
        reset()
        
        // Track successful submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'BDT',
            value: 0,
            lead_type: 'early_access'
          })
        }
      } else {
        toast.error(result.message || 'সাবমিট করতে সমস্যা হয়েছে')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('সার্ভারে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Card className="p-12 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          
          <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'bn' ? 'আবেদন সফল হয়েছে!' : 'Application received!'}
          </h3>
          
          <p className={`text-gray-600 mb-8 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'bn'
              ? 'আপনার Early Access আবেদনটি আমরা পেয়েছি। লঞ্চের আগেই আপনাকে ডেমো এক্সেস এবং বিশেষ অফার দেওয়া হবে।'
              : 'We\'ve received your Early Access request. You\'ll get demo access and special pricing before launch.'}
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center p-3 bg-white rounded-lg">
              <Clock className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <div className={`font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'পরবর্তী পদক্ষেপ' : 'Next steps'}
                </div>
                <div className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn'
                    ? '২৪-৪৮ ঘণ্টার মধ্যে আমরা আপনার সাথে যোগাযোগ করব'
                    : 'We\'ll reach out within 24–48 hours.'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-white rounded-lg">
              <Shield className="w-5 h-5 text-emerald-500 mr-3" />
              <div>
                <div className={`font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'প্রাইভেসি সুরক্ষিত' : 'Privacy protected'}
                </div>
                <div className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn'
                    ? 'আপনার তথ্য কখনো শেয়ার করা হবে না'
                    : 'Your data is never shared with third parties.'}
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => setIsSuccess(false)}
          >
            <span className={language === 'bn' ? 'font-bengali' : ''}>
              {language === 'bn' ? 'আরেকটি আবেদন করুন' : 'Submit another request'}
            </span>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <section id="early-access" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 opacity-80" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white mb-6 shadow">
                <Clock className="w-4 h-4 mr-2" />
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'bn' ? 'সীমিত স্লট' : 'Limited slots'}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'bn' ? 'Early Access ফ্রি নিন' : 'Get Early Access for free'}
                </span>
                <span className="block text-green-600">
                  <span className={language === 'bn' ? 'font-bengali' : ''}>
                    {language === 'bn' ? 'এবং ২০% ডিসকাউন্ট পান' : 'and lock 20% lifetime discount'}
                  </span>
                </span>
              </h2>
              
              <p className={`text-lg text-gray-600 max-w-2xl mx-auto mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn'
                  ? 'প্রথম ১০০ জন Early Access ইউজার পাবেন বিশেষ মূল্যে লাইফটাইম ডিসকাউন্ট এবং লঞ্চের আগেই ডেমো অ্যাক্সেস।'
                  : 'First 100 Early Access users get lifetime discounted pricing and pre-launch demo access.'}
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Benefits Sidebar */}
              <div className="lg:col-span-2">
                <Card className="p-6 h-full bg-gradient-to-b from-blue-50 to-white border-blue-100 shadow-md">
                  <h3 className={`text-xl font-bold text-gray-900 mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? 'Early Access সুবিধা' : 'Why Early Access?'}
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Shield,
                        titleBn: "প্রাইওরিটি সাপোর্ট",
                        descBn: "২৪/৭ প্রাইওরিটি টেকনিক্যাল সাপোর্ট",
                        titleEn: "Priority support",
                        descEn: "24/7 priority technical support",
                      },
                      {
                        icon: Clock,
                        titleBn: "লঞ্চ আগেই অ্যাক্সেস",
                        descBn: "সবচেয়ে আগে সিস্টেম টেস্ট করুন",
                        titleEn: "Pre-launch access",
                        descEn: "Test the system before public launch",
                      },
                      {
                        icon: Users,
                        titleBn: "এক্সক্লুসিভ কমিউনিটি",
                        descBn: "অন্যান্য চিকিৎসকদের সাথে নেটওয়ার্ক করুন",
                        titleEn: "Exclusive community",
                        descEn: "Network with other early adopters",
                      },
                      {
                        icon: CheckCircle2,
                        titleBn: "২০% লাইফটাইম ডিসকাউন্ট",
                        descBn: "সব সময়ের জন্য বিশেষ মূল্য",
                        titleEn: "20% lifetime discount",
                        descEn: "Preferred pricing for the life of your plan",
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="p-2 rounded-lg bg-white border border-blue-200 mr-4">
                          <benefit.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className={`font-semibold text-gray-900 mb-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {language === 'bn' ? benefit.titleBn : benefit.titleEn}
                          </div>
                          <div className={`text-sm text-gray-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {language === 'bn' ? benefit.descBn : benefit.descEn}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <Card className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? 'আপনার নাম *' : 'Your name *'}
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name ? 'border-rose-300' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                          placeholder={language === 'bn' ? 'ডাঃ রায়হান আহমেদ' : 'Dr. Rahim Ahmed'}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-rose-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? 'ইমেইল *' : 'Email *'}
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-rose-300' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors`}
                          placeholder={language === 'bn' ? 'dr.raihan@example.com' : 'dr.rahim@example.com'}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-rose-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile number'}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          +88
                        </div>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full pl-14 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                          placeholder="01234567890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-rose-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Professional Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? 'আপনার পদ *' : 'Your role *'}
                        </label>
                        <select
                          {...register('role')}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white"
                        >
                          <option value="DOCTOR">{language === 'bn' ? 'চিকিৎসক' : 'Doctor'}</option>
                          <option value="CLINIC_OWNER">{language === 'bn' ? 'ক্লিনিক মালিক' : 'Clinic owner'}</option>
                          <option value="DIAGNOSTIC_CENTER_OWNER">{language === 'bn' ? 'ডায়াগনস্টিক সেন্টার মালিক' : 'Diagnostic owner'}</option>
                          <option value="HOSPITAL_ADMIN">{language === 'bn' ? 'হাসপাতাল প্রশাসক' : 'Hospital admin'}</option>
                          <option value="DENTIST">{language === 'bn' ? 'দন্ত চিকিৎসক' : 'Dentist'}</option>
                          <option value="PHARMACIST">{language === 'bn' ? 'ফার্মাসিস্ট' : 'Pharmacist'}</option>
                          <option value="MEDICAL_STUDENT">{language === 'bn' ? 'মেডিকেল ছাত্র' : 'Medical student'}</option>
                          <option value="OTHER">{language === 'bn' ? 'অন্যান্য' : 'Other'}</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? 'প্রতিষ্ঠানের আকার' : 'Organization size'}
                        </label>
                        <select
                          {...register('organizationSize')}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white"
                        >
                          <option value="INDIVIDUAL">{language === 'bn' ? 'একক চিকিৎসক' : 'Individual'}</option>
                          <option value="SMALL_2_10">{language === 'bn' ? 'ছোট (২-১০ জন)' : 'Small (2–10)'}</option>
                          <option value="MEDIUM_11_50">{language === 'bn' ? 'মাঝারি (১১-৫০ জন)' : 'Medium (11–50)'}</option>
                          <option value="LARGE_51_PLUS">{language === 'bn' ? 'বড় (৫০+ জন)' : 'Large (51+)'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {language === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Organization name'}
                      </label>
                      <input
                        {...register('company')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                        placeholder={language === 'bn' ? 'সিটি হাসপাতাল / আপনার ক্লিনিকের নাম' : 'City Hospital / your clinic name'}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium text-gray-900 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {language === 'bn' ? 'বিশেষ বার্তা (ঐচ্ছিক)' : 'Additional notes (optional)'}
                      </label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none"
                        placeholder={language === 'bn' ? 'আপনার বিশেষ প্রয়োজন বা প্রশ্ন লিখুন...' : 'Share any special needs or questions...'}
                      />
                      <div className={`text-sm text-gray-500 mt-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {watch('message')?.length || 0}/{language === 'bn' ? '৫০০ অক্ষর' : '500 characters'}
                      </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className={`text-sm text-gray-700 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {language === 'bn'
                              ? 'আপনার তথ্য সম্পূর্ণ গোপন রাখা হবে। শুধুমাত্র প্ল্যাটফর্ম আপডেট এবং বিশেষ অফার জানানোর জন্য ব্যবহার করা হবে।'
                              : 'Your details will be kept confidential and used only for product updates and offers.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          <span className={language === 'bn' ? 'font-bengali' : ''}>
                            {language === 'bn' ? 'সাবমিট হচ্ছে...' : 'Submitting...'}
                          </span>
                        </>
                      ) : (
                        <span className={language === 'bn' ? 'font-bengali' : ''}>
                          {language === 'bn' ? 'Early Access আবেদন করুন' : 'Apply for Early Access'}
                        </span>
                      )}
                    </Button>

                    <p className={`text-center text-sm text-gray-500 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {language === 'bn' ? 'আমরা আপনার সাথে যোগাযোগ করব' : 'We\'ll get back to you shortly.'}
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}