'use client';

import React, { HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import {
  Navbar, NavbarContent, NavbarItem, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
} from '@nextui-org/navbar';
import navigation from '@/app/lib/navigation';
import Logo from '@/app/components/Logo';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';

type MenuItem = {
  href: string;
  title: string;
  label?: string;
  target?: HTMLAttributeAnchorTarget;
};

const menuItems: Array<MenuItem> = [
  {
    href: '#about',
    title: 'About',
  },
  {
    href: '#explore',
    title: 'Explore',
  },
  {
    href: '#team',
    title: 'Team',
  },
  {
    href: 'https://docs.farcaster.xyz/reference/frames/spec',
    title: 'Documentation',
    label: 'Farcaster Documentation (opens in a new tab)',
    target: '_blank',
  },
];
export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar maxWidth="2xl" height="6rem" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo className="size-12" />
            <span className="hidden font-audiowide text-3xl dark:text-main lg:inline">FrameMaker</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-0 md:flex lg:gap-2 xl:gap-4" justify="center">
        {menuItems.map(({
          href, title, label, target,
        }) => (
          <NavbarItem key={href}>
            <Link
              href={href}
              target={target}
              aria-label={label || title}
              className="block p-4 font-audiowide hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
            >
              {title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Link className="rounded-full border-2 border-main px-9 py-4 font-audiowide dark:text-main hover:dark:bg-main hover:dark:text-zinc-800" href={navigation.LOGIN}>
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({
          href, title, label, target,
        }) => (
          <NavbarMenuItem key={href}>
            <Link
              href={href}
              target={target}
              aria-label={label || title}
              className="block p-4 font-audiowide"
              onClick={() => setIsMenuOpen(false)}
            >
              {title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
