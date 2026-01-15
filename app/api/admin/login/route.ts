// app/api/admin/login/route.ts

export const runtime = 'nodejs' // REQUIRED for bcrypt + jsonwebtoken

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})


export async function POST(req: Request) {
  try {
    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set')
    }

    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // ✅ Correct Prisma query (NOT findUnique)
    const user = await db.user.findFirst({
      where: {
        email,
        role: 'ADMIN',
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Admin account not found' },
        { status: 404 }
      )
    }

    // ✅ Handle both seeded plain-text and hashed passwords
    const isHashed =
      user.password.startsWith('$2a$') ||
      user.password.startsWith('$2b$')

    const isPasswordValid = isHashed
      ? await compare(password, user.password)
      : password === user.password

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // ✅ Generate JWT
    const token = sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password before returning user
    const { password: _password, ...safeUser } = user

    return NextResponse.json(
      {
        success: true,
        token,
        user: safeUser,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Admin login error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
