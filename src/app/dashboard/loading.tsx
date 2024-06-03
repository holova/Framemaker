'use client';

import React from 'react';
import { CircularProgress } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <CircularProgress label="Loading..." />
    </div>
  );
}
