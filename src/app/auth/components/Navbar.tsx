'use client';

import React from 'react';
import Link from 'next/link';
import {
  Navbar, NavbarContent, NavbarItem, NavbarBrand,
} from '@nextui-org/navbar';
import navigation from '@/app/lib/navigation';
import Logo from '@/app/components/Logo';

export default function AuthNavbar() {
  return (
    <Navbar maxWidth="2xl" height="6rem">
      <NavbarContent>
        <NavbarItem>
          <NavbarBrand>
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo className="size-12" />
              <span className="hidden font-audiowide text-3xl dark:text-main lg:inline">FrameMaker</span>
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <Link
            href={navigation.HOME}
            aria-label="Back to home page"
            className="block p-4 font-audiowide hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
          >
            Home
          </Link>
        </NavbarItem>

      </NavbarContent>
    </Navbar>
  );
}
