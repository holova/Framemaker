import React from 'react';
import cn from '@/app/lib/cn';

export default function Logo({ className }: { className: string }) {
  return (
    <svg className={cn('text-main', className)} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="25" fill="currentColor" />
      <path d="M35 15H15V35" stroke="black" strokeWidth="3" />
      <path d="M22.8261 33.8404L33.8406 33.8403L33.8406 22.8259" stroke="black" strokeWidth="3" />
    </svg>
  );
}
