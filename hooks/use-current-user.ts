/**
 * @file hooks/use-current-user.ts
 * @description Custom React hook providing a clean and simplified reactive interface 
 * for checking NextAuth session state, authentication flags, and user details on the client side.
 */

'use client';

import { useSession } from 'next-auth/react';

/**
 * useCurrentUser Hook.
 * Wraps NextAuth's `useSession` to abstract away status comparisons.
 * 
 * @returns An object containing:
 * - `user`: The session user profile containing identity, role, and schoolId keys.
 * - `isAuthenticated`: Boolean flag asserting that the user is actively logged in.
 * - `isLoading`: Boolean flag asserting that NextAuth is loading session cookies.
 */
export function useCurrentUser() {
  const { data, status } = useSession();

  return {
    user: data?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
}

