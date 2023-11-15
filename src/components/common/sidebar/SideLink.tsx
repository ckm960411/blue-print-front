"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface SideLinkProps {
  title: string;
  href: string;
  icon: ReactNode;
}
export default function SideLink({
  title,
  href,
  icon,
}: Readonly<SideLinkProps>) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-8px rounded-md px-12px py-8px text-16px font-medium ${
        isActive ? "bg-sidebar-active text-main" : "text-gray-500"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
