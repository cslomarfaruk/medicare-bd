'use server'

import { db } from '@/lib/db'
import { z } from 'zod'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(11, 'Phone number must be at least 11 characters long').optional(),
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
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
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
      utmSource: formData.get('utm_source')?.toString(),
      utmMedium: formData.get('utm_medium')?.toString(),
      utmCampaign: formData.get('utm_campaign')?.toString(),
      sessionId: formData.get('sessionId')?.toString(),
      screenSize: formData.get('screenSize')?.toString(),
    }

    const validatedData = leadSchema.parse(rawData)

    if (!validatedData.phone) {
      return {
        success: false,
        message: 'Phone number is required.',
      }
    }

    // Check if phone or email already exists
    const existingLead = validatedData.email
      ? await db.lead.findFirst({ where: { email: validatedData.email } })
      : await db.lead.findUnique({ where: { phone: validatedData.phone } })

    if (existingLead) {
      return {
        success: false,
        message: 'This lead already exists in our system.',
      }
    }

    const lead = await db.lead.create({
      data: {
        ...validatedData,
        phone: validatedData.phone,
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
      message: 'Your lead has been submitted successfully. Thank you!',
    }
  } catch (error) {
    console.error('Lead submission error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
        message: 'Your submission contains invalid data. Please check and try again.',
      }
    }

    return {
      success: false,
      message: 'Server error occurred while submitting your lead. Please try again later.',
    }
  }
}
