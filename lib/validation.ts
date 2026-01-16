// lib/validation.ts
import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string()
    .min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে')
    .max(100, 'নাম ১০০ অক্ষরের মধ্যে হতে হবে'),
  
  email: z.string()
    .email('সঠিক ইমেইল ঠিকানা দিন')
    .max(150, 'ইমেইল ১৫০ অক্ষরের মধ্যে হতে হবে'),
  
  phone: z.string()
    .regex(/^(?:\+88|01)?\d{11}$/, 'সঠিক মোবাইল নম্বর দিন')
    .optional()
    .or(z.literal('')),
  
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
  
  organization: z.string()
    .max(200, 'প্রতিষ্ঠানের নাম ২০০ অক্ষরের মধ্যে হতে হবে')
    .optional()
    .or(z.literal('')),
  
  organizationSize: z.enum([
    'INDIVIDUAL',
    'SMALL_2_10',
    'MEDIUM_11_50',
    'LARGE_51_PLUS'
  ]).optional(),
  
  message: z.string()
    .max(500, 'বার্তা ৫০০ অক্ষরের মধ্যে হতে হবে')
    .optional()
    .or(z.literal('')),
})

export const contactSchema = z.object({
  name: leadSchema.shape.name,
  email: leadSchema.shape.email,
  subject: z.string()
    .min(5, 'বিষয় কমপক্ষে ৫ অক্ষরের হতে হবে')
    .max(200, 'বিষয় ২০০ অক্ষরের মধ্যে হতে হবে'),
  message: z.string()
    .min(10, 'বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে')
    .max(1000, 'বার্তা ১০০০ অক্ষরের মধ্যে হতে হবে'),
})

export const loginSchema = z.object({
  email: z.string().email('সঠিক ইমেইল দিন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
})

export const pricingSchema = z.object({
  plan: z.enum(['STARTER', 'GROWTH', 'PRO', 'ENTERPRISE']),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']),
  users: z.number().min(1).max(1000),
  addons: z.array(z.string()).optional(),
})

// Helper functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(?:\+88|01)?\d{11}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 5000) // Limit length
}

export function formatValidationErrors(errors: z.ZodError) {
  return errors.issues.map(error => ({
    field: error.path.join('.'),
    message: error.message
  }))
}
