import 'dotenv/config'
import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const adminPassword = await hash('admin', 10)

  await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      email: 'admin@email.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const leads = [
    {
      name: 'আব্দুল হাকিম',
      role: 'DOCTOR',
      organization: 'City Hospital',
      organizationSize: 'SMALL_2_10',
      phone: '01712345678',
      email: 'abdul.hakim@example.com',
      message: 'Need early access',
      status: 'NEW',
      source: 'early-access-form',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'campaign_1',
      sessionId: 'abc123',
      landingPage: '/',
      screenSize: '1920x1080',
    },
    {
      name: 'ফাতেমা বেগম',
      role: 'CLINIC_OWNER',
      organization: 'Fatema Clinic',
      organizationSize: 'MEDIUM_11_50',
      phone: '01987654321',
      email: 'fatema.begum@example.com',
      message: 'Interested in joining',
      status: 'CONTACTED',
      source: 'early-access-form',
    },
  ]

  for (const leadData of leads) {
    await prisma.lead.upsert({
      where: { phone: leadData.phone },
      update: {},
      create: leadData,
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
