'use server'

import { db } from '@/lib/db'
import { z } from 'zod'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(11).optional(),
  role: z.enum([
    'DOCTOR',
    'CLINIC_OWNER',
    'DIAGNOSTIC_CENTER_OWNER',
    'HOSPITAL_ADMIN',
    'DENTIST',
    'PHARMACIST',
    'MEDICAL_STUDENT',
    'OTHER',
  ]),
  company: z.string().optional(),
  organizationSize: z.enum([
    'INDIVIDUAL',
    'SMALL_2_10',
    'MEDIUM_11_50',
    'LARGE_51_PLUS',
  ]).optional(),
  message: z.string().max(500).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  sessionId: z.string().optional(),
  landingPage: z.string().optional(),
  screenSize: z.string().optional(),
})

export async function submitLeadForm(formData: FormData) {
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const referrer = headersList.get('referer') || ''
    const ipAddress = headersList.get('x-forwarded-for') || '127.0.0.1'

    const parser = new UAParser(userAgent)
    const deviceInfo = parser.getResult()

    const rawData = {
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      phone: formData.get('phone')?.toString(),
      role: formData.get('role')?.toString(),
      company: formData.get('company')?.toString(),
      organizationSize: formData.get('organizationSize')?.toString(),
      message: formData.get('message')?.toString(),
      landingPage: formData.get('landingPage')?.toString() || '/',
      utm_source: formData.get('utm_source')?.toString(),
      utm_medium: formData.get('utm_medium')?.toString(),
      utm_campaign: formData.get('utm_campaign')?.toString(),
      sessionId: formData.get('sessionId')?.toString(),
      screenSize: formData.get('screenSize')?.toString(),
    }

    const validatedData = leadSchema.parse(rawData)

    // Check if phone or email already exists
    const existingLead = validatedData.email
      ? await db.lead.findFirst({ where: { email: validatedData.email } })
      : validatedData.phone
      ? await db.lead.findUnique({ where: { phone: validatedData.phone } })
      : null

    if (existingLead) {
      return {
        success: false,
        message: 'এই ফোন বা ইমেইল দিয়ে ইতিমধ্যে আবেদন করা হয়েছে',
      }
    }

    const lead = await db.lead.create({
      data: {
        ...validatedData,
        ipAddress,
        userAgent,
        referrer,
        metadata: {
          device: deviceInfo.device.type || 'desktop',
          browser: deviceInfo.browser.name,
          os: deviceInfo.os.name,
          screen: validatedData.screenSize || 'unknown',
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    console.log('New lead:', lead)

    return {
      success: true,
      data: lead,
      message: 'আপনার আবেদনটি সফলভাবে জমা হয়েছে! শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।',
    }
  } catch (error) {
    console.error('Lead submission error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
        message: 'আপনার ইনপুটে সমস্যা আছে',
      }
    }

    return {
      success: false,
      message: 'সার্ভারে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন',
    }
  }
}
