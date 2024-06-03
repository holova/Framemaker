import React, { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Audiowide } from 'next/font/google';
import Providers from '@/app/Providers';
import '@farcaster/auth-kit/styles.css';
import './globals.css';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-audiowide',
});

export const metadata: Metadata = {
  title: 'FrameMaker',
  description: "Create interactive app with Farcaster's frames",
  openGraph: {
    url: new URL('https://framemaker.xyz'),
    siteName: 'Framemaker',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className={`${audiowide.variable} scroll-smooth`}>
      <body>
        <Providers>
          <div className="bg-red-950 p-2 text-xs text-white">The site is in BETA!</div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
