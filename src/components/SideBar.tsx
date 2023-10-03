"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBarLink from "./SideBarLink";
import { AiOutlineLaptop } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { PiHamburgerLight } from "react-icons/Pi";
import { MdWorkOutline } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

export default function SideBar() {
  const UNDER_1024PX = useMediaQuery({ query: "(max-width: 1023px)" });
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });

  const [isSpreaded, setIsSpreaded] = useState(true);

  useEffect(() => {
    if (UNDER_1024PX) {
      setIsSpreaded(false);
    } else {
      setIsSpreaded(true);
    }
  }, [UNDER_1024PX]);

  if (UNDER_480PX) return <></>;

  return (
    <div
      className={`min-h-screen flex-shrink-0 border-r border-gray-200 bg-white`}
    >
      <div
        className={`sticky top-0 overflow-hidden duration-200  ${
          isSpreaded ? "w-240px" : "w-88px"
        }`}
      >
        <div
          className={`flex h-72px items-center px-16px ${
            isSpreaded ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            href="/"
            className="hidden p-8px text-24px font-semibold text-gray-800 lg:block lg:text-24px"
          >
            <span className="text-main">BluePrint</span>.Dev
          </Link>
          <button
            onClick={() => setIsSpreaded((prev) => !prev)}
            className={`flex-center block h-56px lg:hidden ${
              isSpreaded ? "w-full" : "w-56px"
            }`}
          >
            <PiHamburgerLight className="text-22px text-gray-800 duration-200 hover:text-main" />
          </button>
        </div>
        <div className="px-16px py-32px">
          <ul className="flex flex-col gap-12px">
            <SideBarLink title="TECH" href="/tech" isSpreaded={isSpreaded}>
              <AiOutlineLaptop className="text-22px" />
            </SideBarLink>
            <SideBarLink title="STUDY" href="/study" isSpreaded={isSpreaded}>
              <BsJournalBookmark className="text-20px" />
            </SideBarLink>
            <SideBarLink title="WORK" href="/work" isSpreaded={isSpreaded}>
              <MdWorkOutline className="text-22px" />
            </SideBarLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
