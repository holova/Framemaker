import React from 'react';
import Link from 'next/link';
import navigation from '@/app/lib/navigation';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  return (
    <div>
      <Link
        href={navigation.FRAMES}
        className="inline-flex items-center justify-between gap-2 rounded-large px-3 py-2.5 text-default-500 outline-none hover:bg-default/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Frames
        <ArrowTopRightOnSquareIcon className="w-5" />
      </Link>
      <Link
        href={navigation.TEMPLATES}
        className="inline-flex items-center justify-between gap-2 rounded-large px-3 py-2.5 text-default-500 outline-none hover:bg-default/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Templates
        <ArrowTopRightOnSquareIcon className="w-5" />
      </Link>
    </div>
  );
}
