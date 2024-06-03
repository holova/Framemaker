'use client';

import React, { useRef } from 'react';
import {
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User,
} from '@nextui-org/react';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import { logout } from '@/app/actions/auth';
import { useAuth } from '@/app/providers/auth';

export default function DashboardNavbar() {
  const logoutRef = useRef<HTMLFormElement>(null);
  const { profile } = useAuth();

  return (
    <div className="flex justify-end gap-2 border-b border-divider px-6 py-2">
      <ThemeSwitcher />
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: profile?.avatar,
            }}
            className="gap-0 transition-transform"
            name=""
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          onAction={(k) => {
            if (k === 'logout') logoutRef.current?.requestSubmit();
          }}
        >
          <DropdownItem key="profile" textValue="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">
              @
              {profile?.username}
            </p>
          </DropdownItem>
          <DropdownItem key="logout" textValue="logout" color="danger">
            <form action={logout} ref={logoutRef} />
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
