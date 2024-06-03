import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';
import { AUTH, LOGIN, DASHBOARD } from '@/app/lib/navigation';

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(DASHBOARD);
  const isGuestRoute = path.startsWith(AUTH);

  // Get session payload from the cookie
  const session = await getSession();

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL(LOGIN, req.nextUrl));
  }

  // Redirect to /dashboard if the user is authenticated
  if (isGuestRoute && session) {
    return NextResponse.redirect(new URL(DASHBOARD, req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
