import React, { PropsWithChildren } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-start">
      <Sidebar />
      <div className="flex h-screen w-full flex-col overflow-auto">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
