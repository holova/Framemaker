import React from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import navigation from '@/app/lib/navigation';

export default function Templates() {
  return (
    <div>
      <Link
        href={`${navigation.TEMPLATES}/delegate`}
        title="Delegate template"
        className="inline-flex items-center justify-between gap-2 rounded-large px-3 py-2.5 text-default-500 outline-none hover:bg-default/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Delegate template
        <ArrowTopRightOnSquareIcon className="w-5" />
      </Link>
    </div>
  );
}
