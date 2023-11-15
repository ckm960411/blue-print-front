import Link from "next/link";
import React from "react";
import { GoSidebarExpand } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import { MdOutlineLaptopChromebook } from "react-icons/md";

export default function SidebarV2() {
  return (
    <div
      className="flex-shirnk-0 w-240px"
      style={{ backgroundColor: "#F6F8FF" }}
    >
      <div className="flex-between h-56px px-16px">
        <Link href="/" className="text-22px font-semibold text-gray-800">
          <span className="text-main">BluePrint</span>.Dev
        </Link>
        <button className="flex-center h-24px w-24px text-18px duration-200 hover:text-main">
          <GoSidebarExpand />
        </button>
      </div>
      <div className="flex flex-col gap-8px p-16px">
        <Link
          href="/study"
          className="flex items-center gap-8px rounded-md bg-gray-100 px-12px py-8px text-16px font-medium text-main"
          style={{ backgroundColor: "#E8EDFF" }}
        >
          <FiBook />
          <span>Study</span>
        </Link>
        <Link
          href="/work"
          className="flex items-center gap-8px rounded-10px px-12px py-8px text-16px font-medium text-gray-600"
        >
          <MdOutlineLaptopChromebook />
          <span>Work</span>
        </Link>
      </div>
    </div>
  );
}
