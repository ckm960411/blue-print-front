import React from "react";
import Link from "next/link";
import { GoSidebarExpand } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import { MdOutlineLaptopChromebook } from "react-icons/md";

import { SideLink } from "@/components/common/sidebar/index";

export default function SidebarV2() {
  return (
    <div className="flex-shirnk-0 bg-sidebar w-240px border-r border-blue-100">
      <div className="flex-between h-56px px-16px">
        <Link href="/" className="text-22px font-semibold text-gray-800">
          <span className="pl-8px text-main">BluePrint</span>.Dev
        </Link>
        <button className="flex-center h-24px w-24px text-18px text-black duration-200 hover:text-main">
          <GoSidebarExpand />
        </button>
      </div>
      <div className="flex flex-col gap-8px p-16px">
        <SideLink title="Study" href="/study" icon={<FiBook />} />
        <SideLink
          title="Work"
          href="/work"
          icon={<MdOutlineLaptopChromebook />}
        />
      </div>
    </div>
  );
}
