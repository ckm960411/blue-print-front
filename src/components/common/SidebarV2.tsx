import Link from "next/link";
import React from "react";
import { GoSidebarExpand } from "react-icons/go";

interface SidebarV2Props {}
export default function SidebarV2({}: SidebarV2Props) {
  return (
    <div className="w-240px" style={{ backgroundColor: "#F6F8FF" }}>
      <div className="flex-between h-56px px-16px">
        <Link href="/work" className="text-22px font-semibold text-gray-800">
          <span className="text-main">BluePrint</span>.Dev
        </Link>
        <button className="flex-center h-24px w-24px text-18px duration-200 hover:text-main">
          <GoSidebarExpand />
        </button>
      </div>
    </div>
  );
}
