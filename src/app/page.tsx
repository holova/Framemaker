import * as React from 'react';
import { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { PUBLIC_BASE_URL } from '@/app/constants';
import Landing from '@/app/components/Landing';

export async function generateMetadata(): Promise<Metadata> {
  const other = await fetchMetadata(`${PUBLIC_BASE_URL}/frames/main`);
  return {
    openGraph: {
      url: new URL('https://framemaker.xyz'),
      siteName: 'FrameMaker',
      images: [other['fc:frame:image'] as string],
      locale: 'en_US',
      type: 'website',
    },
    other,
  };
}

export default function Home() {
  return <Landing />;
}
