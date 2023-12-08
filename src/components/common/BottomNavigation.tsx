"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiBook } from "react-icons/fi";
import { IoIosFitness } from "react-icons/io";
import { MdOutlineLaptopChromebook } from "react-icons/md";
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
          href="/study"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/study") ? "text-main" : ""
          }`}
        >
          <FiBook className="text-20px" />
          <span>Study</span>
        </Link>
        <Link
          href="/work"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/work") ? "text-main" : ""
          }`}
        >
          <MdOutlineLaptopChromebook className="text-22px" />
          <span>Work</span>
        </Link>
        <Link
          href="/health"
          className={`flex-center flex-col gap-4px p-8px font-medium ${
            isActive("/work") ? "text-main" : ""
          }`}
        >
          <IoIosFitness className="text-22px" />
          <span>Health</span>
        </Link>
      </div>
    </div>
  );
}
