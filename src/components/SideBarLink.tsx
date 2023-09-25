'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SideBarLinkProps {
  title: string;
  href: string;
}
export default function SideBarLink({ title, href }: SideBarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`w-full text-18px font-medium text-gray-600 hover:text-main p-16px rounded-xl hover:shadow-lg hover:bg-white duration-200 ${
        isActive ? 'bg-white shadow-lg text-main' : ''
      }`}
    >
      {title}
    </Link>
  );
}
