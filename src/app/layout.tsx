import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/ui/SkipLink';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { ClientProviders } from '@/components/layout/ClientProviders';
import { Analytics } from '@/components/Analytics';
import { CookieConsent } from '@/components/CookieConsent';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Natural Girlies Magazine',
    template: '%s | Natural Girlies Magazine',
  },
  description:
    'The first editorial platform where natural beauty meets data, wellness, and cultural storytelling — designed for women who don\'t just want to look good, but understand their crown.',
  keywords: [
    'natural hair',
    'hair wellness',
    'Black hair care',
    'protective styles',
    'natural beauty',
    'melanin skin care',
    'editorial magazine',
    'hair data',
    'crown report',
  ],
  authors: [{ name: 'Natural Girlies Magazine' }],
  creator: 'Natural Girlies Magazine',
  publisher: 'Natural Girlies Magazine',
  metadataBase: new URL('https://naturalgirlies.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naturalgirlies.com',
    siteName: 'Natural Girlies Magazine',
    title: 'Natural Girlies Magazine — Where Every Crown Tells a Story',
    description:
      'The first editorial platform where natural beauty meets data, wellness, and cultural storytelling.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Natural Girlies Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@naturalgirlies',
    creator: '@naturalgirlies',
    title: 'Natural Girlies Magazine — Where Every Crown Tells a Story',
    description:
      'Hair wellness meets editorial storytelling. Data meets beauty. Culture meets care.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#E8956A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SkipLink />
        <ClientProviders>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ClientProviders>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
