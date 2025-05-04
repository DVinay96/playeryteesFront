import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authStorage = request.cookies.get('auth-storage')?.value
  let isAuthenticated = false

  try {
    const { state } = JSON.parse(authStorage || '{}')
    isAuthenticated = !!state?.token && !state?.requiresPasswordChange
  } catch {
    throw new Error('Invalid auth-storage cookie')
  }

  if (
    request.nextUrl.pathname.startsWith('/user/profile') &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/user/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/profile/:path*'],
}
