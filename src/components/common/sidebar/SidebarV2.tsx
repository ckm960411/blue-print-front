"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GoSidebarExpand } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";

import { WEB_STORAGE_KEY } from "@/utils/common/constant";
import { useLocalStorage } from "@/utils/hooks/common/useLocalStorage";
import { SideLink, SidebarBottom } from "@/components/common/sidebar/index";
import { useMediaQuery } from "react-responsive";

export default function SidebarV2() {
  const UNDER_480PX = useMediaQuery({ query: "(max-width:479px)" });
  const [isLocalOpen, setIsLocalOpen] = useLocalStorage(
    WEB_STORAGE_KEY.SIDEBAR_OPENED,
    true,
  );
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(isLocalOpen);
  }, [isLocalOpen]);

  const toggleOpenSidebar = () => setIsLocalOpen((prev) => !prev);

  if (UNDER_480PX) {
    return <></>;
  }

  return (
    <div
      className={`sticky top-0 flex h-screen flex-shrink-0 flex-col border-r border-blue-100 bg-lightblue duration-200 ${
        isOpen ? "w-240px " : "w-60px items-center"
      }`}
    >
      <div className="flex-between h-56px px-16px">
        {isOpen && (
          <Link href="/" className="text-22px font-semibold text-gray-800">
            <span className="pl-8px text-main">BluePrint</span>.Dev
          </Link>
        )}
        <button
          onClick={toggleOpenSidebar}
          className="flex-center h-24px w-24px text-18px text-black duration-200 hover:text-main"
        >
          <GoSidebarExpand />
        </button>
      </div>
      <div className="flex grow flex-col gap-8px p-16px">
        <SideLink
          title="Study"
          href="/study"
          icon={<FiBook />}
          isSidebarOpen={isOpen}
        />
        <SideLink
          title="Work"
          href="/work"
          icon={<MdOutlineLaptopChromebook />}
          isSidebarOpen={isOpen}
        />
        <SideLink
          title="Health"
          href="/health"
          icon={<IoIosFitness />}
          isSidebarOpen={isOpen}
        />
      </div>
      <SidebarBottom isSidebarOpen={isOpen} />
    </div>
  );
}
