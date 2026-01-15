    // app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { submitLeadForm } from '@/app/actions/lead-actions'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await submitLeadForm(formData)
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 })
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'সার্ভারে সমস্যা হয়েছে' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const status = searchParams.get('status')
    
    const skip = (page - 1) * limit
    
    const where = status ? { status } : {}
    
    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          organization: true,
          size: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.lead.count({ where })
    ])
    
    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('GET leads error:', error)
    return NextResponse.json(
      { success: false, message: 'ডাটা লোড করতে সমস্যা' },
      { status: 500 }
    )
  }
}