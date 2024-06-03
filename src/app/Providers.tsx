'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { AuthProvider } from '@/app/providers/auth';

export default function Providers({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        <AuthKitProvider config={{}}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AuthKitProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
