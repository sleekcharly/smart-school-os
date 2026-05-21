/**
 * @file lib/firebase.ts
 * @description Client-side Firebase SDK configuration and initialization.
 * Safe for use in Next.js Client Components ('use client') and server context.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

/**
 * Firebase Client SDK credentials configuration.
 * Automatically loaded via public environmental variables (`NEXT_PUBLIC_`).
 */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Core Firebase Application Instance.
 * We prevent duplicate initialization on hot-reloading environments (e.g. Next.js dev server)
 * by verifying if any application has already been registered in the `getApps()` array.
 */
export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(config) : getApps()[0];

/**
 * Client-side Authentication helper.
 * Provides user session management, authentication triggers, and token listeners.
 */
export const auth: Auth = getAuth(app);

/**
 * Client-side Firestore Database helper.
 * Enables client routes to read/write structured data directly based on Firebase Security Rules.
 */
export const db: Firestore = getFirestore(app);

/**
 * Client-side Firebase Analytics helper.
 * Initialized only in production environments (running inside the browser context)
 * to avoid development telemetry pollution and server-side errors.
 */
export const analytics: Analytics | null =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
    ? getAnalytics(app)
    : null;

