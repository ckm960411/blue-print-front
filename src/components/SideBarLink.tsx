"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SideBarLinkProps {
  title: string;
  children: React.ReactNode;
  href: string;
  isSpreaded: boolean;
}
export default function SideBarLink({
  title,
  children,
  href,
  isSpreaded,
}: SideBarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`min-w-56px flex h-56px w-full items-center gap-12px overflow-hidden rounded-10px border border-white text-18px font-medium text-gray-600 duration-200 hover:bg-white hover:text-main ${
        isActive ? "border-gray-300 bg-white text-main shadow-md" : ""
      } ${isSpreaded ? "justify-start pl-16px" : "justify-center"}`}
    >
      <div>{children}</div>
      <span className={isSpreaded ? "block" : "hidden"}>{title}</span>
    </Link>
  );
}
