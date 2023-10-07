"use client";

import { CategorySection } from "@/utils/types/study";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface SideBarSectionCategoryListProps {
  href: string;
  section: CategorySection;
}
export default function SideBarSectionCategoryList({
  href,
  section,
}: SideBarSectionCategoryListProps) {
  const pathname = usePathname();
  const router = useRouter();

  return section.categories.map((category) => {
    const isActiveCategory = pathname.includes(category.page_id);

    return (
      <li
        key={category.page_id}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`${href}/${category.page_id}`);
        }}
        className={`truncate-1-lines hover:text-main ${
          isActiveCategory ? "font-medium text-main" : "text-gray-600"
        }`}
      >
        {category.title}
      </li>
    );
  });
}
