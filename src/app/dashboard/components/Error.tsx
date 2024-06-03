import React, { PropsWithChildren } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function DashboardError({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-xl font-medium">Error</h1>
      <div className="py-3">
        {children}
      </div>
      <Button onClick={router.refresh}>Refresh</Button>
    </div>
  );
}
