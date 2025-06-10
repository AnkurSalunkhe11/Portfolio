import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Thompson - Software Engineer & Mechanical Engineer',
  description: 'Professional portfolio showcasing software development and mechanical engineering expertise',
  keywords: 'software engineer, mechanical engineer, full stack developer, portfolio',
  authors: [{ name: 'Alex Thompson' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alex-thompson-portfolio.vercel.app'),
  openGraph: {
    title: 'Alex Thompson - Software Engineer & Mechanical Engineer',
    description: 'Professional portfolio showcasing software development and mechanical engineering expertise',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alex-thompson-portfolio.vercel.app',
    siteName: 'Alex Thompson Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Thompson - Software Engineer & Mechanical Engineer',
    description: 'Professional portfolio showcasing software development and mechanical engineering expertise',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AnalyticsProvider>
          {children}
          <CookieConsent />
        </AnalyticsProvider>
      </body>
    </html>
  );
}