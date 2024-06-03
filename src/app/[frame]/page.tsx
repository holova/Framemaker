import React from 'react';
import { Metadata } from 'next';
import { fetchMetadata } from 'frames.js/next';
import { PUBLIC_BASE_URL } from '@/app/constants';
import Landing from '@/app/components/Landing';

type GenerateMetadataProps = {
  params: { frame: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const other = await fetchMetadata(`${PUBLIC_BASE_URL}/${params.frame}/metadata`);
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
