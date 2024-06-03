import React, { PropsWithChildren } from 'react';
import AuthNavbar from '@/app/auth/components/Navbar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthNavbar />
      {children}
    </div>
  );
}
