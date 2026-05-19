import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth as firebaseAuth } from './firebase';
import { adminDb } from './firebase-admin';

declare module 'next-auth' {
  interface User {
    role?: string;
    schoolId?: string;
  }
  interface Session {
    user: User & {
      role?: string;
      schoolId?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    schoolId?: string;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email as string,
            credentials.password as string,
          );

          const firebaseUser = userCredential.user;

          const userDoc = await adminDb
            .collection('users')
            .doc(firebaseUser.uid)
            .get();

          if (!userDoc.exists) {
            throw new Error('User profile missing');
          }

          const profile = userDoc.data();

          return {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: profile?.fullName,
            role: profile?.role,
            schoolId: profile?.schoolId,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.schoolId = user.schoolId;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role;
      session.user.schoolId = token.schoolId;

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});
