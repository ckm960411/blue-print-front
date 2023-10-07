"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useToggle } from "usehooks-ts";
import ToggleButton from "@/components/components/ToggleButton";
import { CategorySection } from "@/utils/types/study";
import SideBarSections from "@/components/common/SideBarSections";

interface SideBarLinkProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  isSpreaded: boolean;
  sections?: CategorySection[];
}
export default function SideBarLink({
  title,
  icon,
  href,
  isSpreaded,
  sections,
}: SideBarLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, onToggle] = useToggle(true);

  const isActive = pathname.startsWith(href);

  return (
    <div
      onClick={() => router.push(href)}
      className={`w-full cursor-pointer overflow-hidden rounded-10px border border-white text-18px font-medium text-gray-600 duration-200 hover:bg-white hover:text-main ${
        isActive ? "border-gray-300 bg-white text-main shadow-md" : ""
      } `}
    >
      <div
        className={`flex h-56px items-center justify-between gap-12px ${
          isSpreaded ? "justify-start pl-16px" : "justify-center"
        }`}
      >
        <div className="flex h-56px items-center gap-12px">
          <div>{icon}</div>
          <span className={isSpreaded ? "block" : "hidden"}>{title}</span>
        </div>
        {sections && isActive && (
          <div className="pr-16px">
            <ToggleButton open={open} onToggle={onToggle} w={16} h={16} />
          </div>
        )}
      </div>
      <SideBarSections
        show={!!sections && isActive && open}
        sections={sections}
      />
    </div>
  );
}
