/**
 * @file proxy.ts
 * @description Next.js Request Proxy (formerly known as Middleware).
 * Intercepts incoming requests matching the configured paths to verify NextAuth
 * sessions before routing or rendering proceeds.
 */

// Export NextAuth's auth handler as the 'proxy' export (required by Next.js 16)
export { auth as proxy } from './lib/auth';

/**
 * Proxy routing matcher config.
 * Defines the whitelisted path patterns that should trigger this authentication check.
 * Excludes metadata files, static assets, and api routes as configured.
 */
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

