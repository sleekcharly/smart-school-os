/**
 * @file app/api/auth/[...nextauth]/route.ts
 * @description NextAuth catch-all API route handler.
 * Dynamically maps incoming authentication endpoints (e.g. `/api/auth/signin`,
 * `/api/auth/signout`, `/api/auth/session`) to NextAuth handler callbacks.
 */

import { handlers } from '@/lib/auth';

/**
 * Route handlers for GET and POST HTTP requests.
 * Destructured and exported to bind NextAuth callbacks to serverless route operations.
 */
export const { GET, POST } = handlers;

