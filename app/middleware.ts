import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('admin_token')?.value

  // If trying to access a protected route
  if (
    pathname.startsWith('/internal-dashboard') ||
    (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login'))
  ) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // Add user info to headers for API routes
      if (pathname.startsWith('/api/admin')) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', (payload as any).userId?.toString() || '')
        requestHeaders.set('x-user-role', (payload as any).role || '')

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      }

      return NextResponse.next()
    } catch (error) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (for NextAuth if you use it)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/admin/login (the admin login route)
     */
    '/internal-dashboard/:path*',
    '/api/admin/:path*',
    '/admin/login', // To handle already logged-in users
  ],
}