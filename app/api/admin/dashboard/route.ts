// app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // In a real app, you'd fetch this from your database
    const totalLeads = await db.lead.count()
    const convertedLeads = await db.lead.count({ where: { status: 'CONVERTED' } })
    
    // Dummy data for now
    const totalRevenue = 123456
    const activeCampaigns = 3

    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

    const recentLeads = await db.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      totalLeads,
      conversionRate: conversionRate.toFixed(1),
      totalRevenue,
      activeCampaigns,
      recentLeads,
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}