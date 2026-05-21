/**
 * @file lib/auth.ts
 * @description NextAuth configuration module. Integrates Firebase Client Authentication
 * with Firebase Admin SDK Firestore query to fetch and attach user roles and school profiles.
 */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth as firebaseAuth } from './firebase';
import { adminDb } from './firebase-admin';

// =========================================================================
// TypeScript Module Declarations
// =========================================================================

/**
 * Extend NextAuth's internal User and Session interfaces
 * to include RBAC (Role-Based Access Control) properties.
 */
declare module 'next-auth' {
  interface User {
    /** Role-based access control profile (e.g. 'superadmin', 'admin', 'teacher', 'parent', 'student') */
    role?: string;
    /** Unique identifier linking this user to their specific school entity */
    schoolId?: string;
  }
  interface Session {
    user: User & {
      role?: string;
      schoolId?: string;
    };
  }
}

/**
 * Extend NextAuth's JSON Web Token (JWT) interface
 * to persist RBAC credentials during the session lifetime.
 */
declare module 'next-auth/jwt' {
  interface JWT {
    /** Stored user role */
    role?: string;
    /** Associated school ID for multitenancy scoping */
    schoolId?: string;
  }
}

// =========================================================================
// NextAuth Core Config
// =========================================================================

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Use JSON Web Tokens (JWT) for lightweight, stateless session tracking
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',

      // Define form field placeholders for sign-in validation
      credentials: {
        email: {},
        password: {},
      },

      /**
       * Core authorization handler.
       * 1. Validates user credentials via the Firebase Client SDK.
       * 2. Checks Firestore DB via Admin SDK to get the user's operational role and school context.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Step 1: Sign in user with Firebase client authentication SDK
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email as string,
            credentials.password as string,
          );

          const firebaseUser = userCredential.user;

          // Step 2: Query Firestore using Firebase Admin SDK to fetch user profile details
          const userDoc = await adminDb
            .collection('users')
            .doc(firebaseUser.uid)
            .get();

          if (!userDoc.exists) {
            throw new Error('User profile missing');
          }

          const profile = userDoc.data();

          // Step 3: Return consolidated User object containing core identity & profile mappings
          return {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: profile?.fullName,
            role: profile?.role,
            schoolId: profile?.schoolId,
          };
        } catch (error) {
          // Log errors safely without leaking sensitive information
          console.error('Authentication Error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    /**
     * JWT Callback: Persists user-specific details (role, schoolId) from the authorize method
     * directly into the token structure for instant client checks.
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.schoolId = user.schoolId;
      }

      return token;
    },

    /**
     * Session Callback: Exposes relevant token details to client components via the `useSession` hook.
     */
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role;
      session.user.schoolId = token.schoolId;

      return session;
    },
  },

  // Direct NextAuth custom routing layouts
  pages: {
    signIn: '/login',
  },
});

