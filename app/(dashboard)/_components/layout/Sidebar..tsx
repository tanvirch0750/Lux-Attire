'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

import Link from 'next/link';
import { DashboardNav } from '../DashboardNav';
import { navItems } from '../../_constant/data';
import Logo from '@/assests/luxe-attire-logo.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleSidebar } from '@/lib/features/sidebarSlice';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useDispatch();
  const isMinimized = useSelector(
    (state: RootState) => state.sidebar.isMinimized
  );

  //   const handleToggle = () => {
  //     toggle();
  //   };

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block `,
        !isMinimized ? ' w-64' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href="/" target="_blank">
          <Image src={Logo} alt="Luxe attire" width={100} />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-[60px] z-50  cursor-pointer rounded-full border bg-background text-3xl text-gray-400',
          isMinimized && 'rotate-180'
        )}
        onClick={() => dispatch(toggleSidebar())}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
