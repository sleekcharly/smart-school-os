/**
 * @file lib/firebase-admin.ts
 * @description Privileged server-side Firebase Admin SDK setup.
 * Accesses protected cloud services bypassing user security rules.
 * This module MUST ONLY be imported and executed inside Server Actions, Route Handlers, or SSR pages.
 */

import admin from 'firebase-admin';

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Environmental variables usually escape linebreaks as '\n'. 
      // We parse them back to literal newline characters for formatting compatibility.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

/**
 * Server-side Admin Auth context.
 * Used for verifying custom JWTs, updating user records, and managing session cookies.
 */
export const adminAuth = admin.auth();

/**
 * Server-side Admin Firestore context.
 * Grants unrestricted query capabilities across all collections with bypassed client rules.
 */
export const adminDb = admin.firestore();

