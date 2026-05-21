/**
 * @file providers/session-provider.tsx
 * @description NextAuth context session provider component.
 * Instantiates the React context wrapper required to read session profiles in client sub-trees.
 */

'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * AuthProvider component.
 * Wraps downstream children with NextAuth's `SessionProvider`.
 * Since NextAuth handles session polling and updates inside a React Context,
 * this wrapper must be marked `'use client'`.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

