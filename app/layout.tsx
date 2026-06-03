/**
 * @file app/layout.tsx
 * @description Root application layout for the Rektora school management platform.
 * Sets up global theme providers, registers optimized Google web fonts, implements
 * rich technical SEO configurations (OpenGraph, Twitter, canonical anchors),
 * and injects structured JSON-LD schema models for search engine indexing.
 */

import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

// =========================================================================
// Font Configurations (Tailwind Variable Mappings)
// =========================================================================

/**
 * Inter Font.
 * Primary sans-serif font used for dashboard numbers, tables, and functional forms.
 */
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

/**
 * Plus Jakarta Sans Font.
 * Styled display font used for marketing headings, cards, and section banners.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal'],
});

// =========================================================================
// Global Metadata Config (Search Engine Optimization)
// =========================================================================

export const metadata: Metadata = {
  // Absolute base domain for referencing assets (e.g. social preview images)
  metadataBase: new URL('https://rektota.com'),

  title: {
    // Default page title displayed when custom sub-page titles are omitted
    default: 'Rektora - School Management Software for Nigerian Schools',
    // Template placeholder (e.g. "Fees | Rektora" when a sub-page supplies "Fees")
    template: '%s | Rektora',
  },

  description:
    'Collect fees, manage results, track students, and communicate with parents — all in one platform.',

  keywords: [
    'school management software Nigeria',
    'school fee collection app Nigeria',
    'student management system Africa',
    'school ERP Nigeria',
    'report card software Nigeria',
    'parent portal school Nigeria',
  ],

  authors: [{ name: 'Rektora', url: 'https://rektota.com' }],
  creator: 'Rektora',

  // Direct indexing directives for web spiders
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // Link to canonical absolute URL to prevent duplicate index pages
  alternates: { canonical: 'https://rektota.com' },

  // OpenGraph rich visual card details (e.g. WhatsApp, Facebook links share preview)
  openGraph: {
    type: 'website',
    locale: 'en_NG', // Target Nigerian market locale
    url: 'https://rektota.com',
    siteName: 'Rektora',
    title: 'Rektora — School Management Software for Nigerian Schools',
    description:
      'The smart way to run your school. Fees, results, parent communication — one platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rektora school management dashboard',
      },
    ],
  },

  // Twitter card previews layout definitions
  twitter: {
    card: 'summary_large_image',
    title: 'Rektora — School Management Software',
    description:
      'Collect fees, manage results, and communicate with parents — all in one platform.',
    images: ['/og-image.png'],
    creator: '@rektora_io',
  },
};

// =========================================================================
// Main Root Layout Shell
// =========================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * JSON-LD (JSON for Linking Data).
   * Declares structured semantic vocabularies that help Google understand the software
   * category, aggregate user rating scores, and business support context.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Rektora',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '20000',
          highPrice: '40000',
          priceCurrency: 'NGN',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '3',
        },
      },
      {
        '@type': 'Organization',
        name: 'Rektora',
        url: 'https://rektota.com',
        logo: 'https://rektota.com/icon_only_logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@rektota.com',
          contactType: 'customer support',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      // Map loaded font variables directly to tailwind system bindings
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Child Router pages injection anchor */}
        {children}

        {/* Injected script block supplying JSON-LD metadata markup directly to headers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Toaster />
      </body>
    </html>
  );
}
