import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // 1. Get Total Leads
    const totalLeads = await db.lead.count()

    // 2. Get Role Distribution (Real Data for the Bar Chart)
    // Group by 'role' to see if you are getting Doctors or Clinic Owners
    const roleGroups = await db.lead.groupBy({
      by: ['role'],
      _count: {
        _all: true
      }
    })

    // Transform Prisma result into a simple object: { "DOCTOR": 5, "STUDENT": 2 }
    const roleDistribution = roleGroups.reduce((acc, curr) => {
      // If role is null, label it 'UNKNOWN'
      const key = curr.role || 'UNKNOWN' 
      acc[key] = curr._count._all
      return acc
    }, {} as Record<string, number>)

    // 3. Find Top Traffic Source (Real Data for KPI Card)
    // We check 'utmSource' to see where people are coming from (FB, Google, etc.)
    const sourceGroups = await db.lead.groupBy({
      by: ['utmSource'],
      _count: { _all: true },
      orderBy: {
        _count: { utmSource: 'desc' }
      },
      take: 1
    })
    const topSource = sourceGroups[0]?.utmSource || 'Direct'

    // 4. Calculate Mobile Usage (Real Data for KPI Card)
    // We count leads where the user agent or screen size suggests a mobile device
    const mobileCount = await db.lead.count({
      where: {
        OR: [
          { screenSize: { contains: 'mobile' } }, // If your frontend sends "mobile" in screen size
          { userAgent: { contains: 'Mobile' } },
          { userAgent: { contains: 'Android' } },
          { userAgent: { contains: 'iPhone' } }
        ]
      }
    })
    
    const mobilePercentage = totalLeads > 0 
      ? Math.round((mobileCount / totalLeads) * 100) 
      : 0

    // 5. Get Recent Leads (The "God Mode" Data)
    // We fetch EVERYTHING (no select clause) so your modal can show IP, Headers, Metadata etc.
    const recentLeads = await db.lead.findMany({
      take: 10, // Increased to 10 rows
      orderBy: { createdAt: 'desc' },
    })

    // 6. Calculate Top Role (for the KPI Card)
    // Sort the distribution we calculated in step 2 to find the winner
    const topRoleEntry = Object.entries(roleDistribution)
      .sort(([, a], [, b]) => b - a)[0]
    const topRole = topRoleEntry ? topRoleEntry[0] : 'N/A'

    // Return the exact shape your new Dashboard expects
    return NextResponse.json({
      totalLeads,
      roleDistribution,
      topSource,
      mobilePercentage,
      recentLeads,
      topRole
    })

  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}