import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eduvia.io'),
  title: {
    default: 'Eduvia - School Management Software for Nigerian Schools',
    template: '%s | Eduvia',
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
  authors: [{ name: 'Eduvia', url: 'https://eduvia.io' }],
  creator: 'Eduvia',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: 'https://eduvia.io' },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://eduvia.io',
    siteName: 'Eduvia',
    title: 'Eduvia — School Management Software for Nigerian Schools',
    description:
      'The smart way to run your school. Fees, results, parent communication — one platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eduvia school management dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduvia — School Management Software',
    description:
      'Collect fees, manage results, and communicate with parents — all in one platform.',
    images: ['/og-image.png'],
    creator: '@eduvia_io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Eduvia',
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
        name: 'Eduvia',
        url: 'https://eduvia.io',
        logo: 'https://eduvia.io/icon_only_logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@eduvia.io',
          contactType: 'customer support',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
