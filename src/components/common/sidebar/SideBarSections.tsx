"use client";

import React from "react";
import { CategorySection } from "@/utils/types/study";
import { usePathname } from "next/navigation";
import SideBarSectionCategoryList from "@/components/common/sidebar/SideBarSectionCategoryList";

interface SideBarSectionsProps {
  show: boolean;
  href: string;
  sections?: CategorySection[];
}
export default function SideBarSections({
  show,
  href,
  sections,
}: SideBarSectionsProps) {
  const pathname = usePathname();

  if (!show || !sections) return <></>;

  return (
    <div className="w-full px-12px pb-12px">
      <ul className="flex max-h-[320px] flex-col gap-16px overflow-y-scroll rounded-10px bg-gray-50 p-8px text-14px leading-[150%] text-gray-600">
        {sections.map((section) => (
          <li key={section.id}>
            <p className="font-semibold">{section.name}</p>
            <div className="my-6px h-1px bg-gray-400" />
            <ul className="flex flex-col gap-6px text-12px leading-[140%]">
              <SideBarSectionCategoryList href={href} section={section} />
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
