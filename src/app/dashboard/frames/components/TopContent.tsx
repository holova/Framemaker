import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import navigation from '@/app/lib/navigation';

export default function TopContent() {
  return (
    <div className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-medium">Frames list</h1>
      <Button as={Link} href={navigation.CREATE_FRAME} color="primary" endContent={<PlusIcon className="size-4" />}>
        Add New Frame
      </Button>
    </div>
  );
}
