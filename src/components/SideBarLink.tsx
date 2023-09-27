'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SideBarLinkProps {
  children: React.ReactNode;
  href: string;
}
export default function SideBarLink({ children, href }: SideBarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-12px w-full text-18px font-medium text-gray-600 hover:text-main p-16px rounded-10px hover:bg-white duration-200 ${
        isActive ? 'bg-white border border-gray-200 text-main shadow-md' : ''
      }`}
    >
      {children}
    </Link>
  );
}
