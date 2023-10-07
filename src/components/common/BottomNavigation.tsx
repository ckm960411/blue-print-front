"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

export default function BottomNavigation() {
  const UNDER_480PX = useMediaQuery({ query: "(max-width:479px)" });
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  if (!UNDER_480PX) return <></>;

  return (
    <div
      className="sticky bottom-0 w-full flex-shrink-0 rounded-t-xl px-16px py-4px"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="grid grid-cols-3 gap-8px">
        <Link
          href="/tech"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/tech") ? "text-main" : ""
          }`}
        >
          <AiOutlineLaptop className="text-22px" />
          <span>TECH</span>
        </Link>
        <Link
          href="/study"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/study") ? "text-main" : ""
          }`}
        >
          <BsJournalBookmark className="text-20px" />
          <span>STUDY</span>
        </Link>
        <Link
          href="/work"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/work") ? "text-main" : ""
          }`}
        >
          <MdWorkOutline className="text-22px" />
          <span>WORK</span>
        </Link>
      </div>
    </div>
  );
}
