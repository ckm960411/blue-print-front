"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
      className={`flex w-full items-center gap-12px rounded-10px p-16px text-18px font-medium text-gray-600 duration-200 hover:bg-white hover:text-main ${
        isActive ? "border border-gray-200 bg-white text-main shadow-md" : ""
      }`}
    >
      {children}
    </Link>
  );
}
