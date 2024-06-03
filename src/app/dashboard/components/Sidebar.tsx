'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  WindowIcon, HomeIcon, Cog6ToothIcon, ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import navigation from '@/app/lib/navigation';
import cn from '@/app/lib/cn';
import { LinkProps } from 'next/dist/client/link';
import Logo from '@/app/components/Logo';

type SidebarLinkProps = {
  title: string;
  icon: React.ElementType;
  isActive?: boolean;
} & LinkProps;

function SidebarLink({
  title, icon: Icon, isActive = false, ...r
}: SidebarLinkProps) {
  return (
    <Link
      {...r}
      title={title}
      className={cn('flex w-full items-center justify-between gap-2 text-default-500 rounded-large px-3 py-2.5 outline-none hover:bg-default/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus', {
        'bg-default-100 text-foreground': isActive,
      })}
    >
      <Icon className="size-6" />
      <span className="flex-1 truncate text-small font-medium">{title}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen items-center justify-start">
      <div className="relative flex h-full w-72 flex-col border-r border-divider p-6">
        <Link href="/" className="flex items-center gap-2 px-2 pb-6">
          <Logo className="size-8" />
          <span className="font-audiowide text-small dark:text-main">FrameMaker</span>
        </Link>

        <div className="h-full max-h-full overflow-y-auto py-6">
          <div data-slot="base" className="relative flex w-full list-none flex-col gap-1 p-1">
            <nav data-slot="list" className="flex w-full flex-col items-center gap-0.5 outline-none" id="react-aria4900878716-:r0:" tabIndex={-1}>
              <SidebarLink href={navigation.DASHBOARD} title="Home" icon={HomeIcon} isActive={pathname === navigation.DASHBOARD} />
              <SidebarLink href={navigation.FRAMES} title="Frames" icon={WindowIcon} isActive={pathname.startsWith(navigation.FRAMES)} />
              <SidebarLink href={navigation.TEMPLATES} title="Templates" icon={ShoppingBagIcon} isActive={pathname.startsWith(navigation.TEMPLATES)} />
            </nav>
          </div>
        </div>

        <div className="mt-auto flex flex-col">
          <Link
            href="https://docs.farcaster.xyz/reference/frames/spec"
            title="Documentation"
            target="_blank"
            className="flex w-full items-center justify-between gap-2 rounded-large px-3 py-2.5 text-default-500 outline-none
             hover:bg-default/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <Cog6ToothIcon className="size-6" />
            <span className="flex-1 truncate text-small font-medium">Documentation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
