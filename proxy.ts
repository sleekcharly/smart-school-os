export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/super-admin/:path*',
    '/teacher/:path*',
    '/parent/:path*',
    '/students/:path*',
    '/results/:path*',
    '/fees/:path*',
    '/announcements/:path*',
    '/parent-portal/:path*',
    '/settings/:path*',
    '/sessions/:path*',
    '/classes/:path*',
    '/subjects/:path*',
  ],
};
