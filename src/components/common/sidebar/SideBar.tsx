"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBarLink from "./SideBarLink";
import { AiOutlineLaptop } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { PiHamburgerLight } from "react-icons/pi";
import { MdWorkOutline } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useRecoilValue } from "recoil";
import { meState, sideBarOpenState } from "@/utils/recoil/store";
import { getNotionSections } from "@/utils/services/notion";
import { CategorySection } from "@/utils/types/study";

export const CLOSED_SIDE_BAR_WIDTH = 88;
export const OPENED_SIDE_BAR_WIDTH = 240;

export default function SideBar() {
  const UNDER_1024PX = useMediaQuery({ query: "(max-width: 1023px)" });
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });

  const me = useRecoilValue(meState);
  const [isSpreaded, setIsSpreaded] = useRecoilState(sideBarOpenState);
  const [studySections, setStudySections] = useState<CategorySection[]>();

  useEffect(() => {
    setIsSpreaded(!UNDER_1024PX);
  }, [UNDER_1024PX]);

  useEffect(() => {
    getNotionSections()
      .then((data) => setStudySections(data))
      .catch(console.error);
  }, []);

  if (UNDER_480PX) return <></>;

  return (
    <div className="min-h-screen flex-shrink-0 border-r border-gray-200 bg-white">
      <div
        className="sticky top-0 overflow-hidden duration-200"
        style={{
          width: isSpreaded ? OPENED_SIDE_BAR_WIDTH : CLOSED_SIDE_BAR_WIDTH,
        }}
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
            <SideBarLink
              title="TECH"
              icon={<AiOutlineLaptop className="text-22px" />}
              href="/tech"
              isSpreaded={isSpreaded}
            />
            <SideBarLink
              title="STUDY"
              icon={<BsJournalBookmark className="text-20px" />}
              href="/study"
              isSpreaded={isSpreaded}
              sections={studySections}
            />
            {me && (
              <SideBarLink
                title="WORK"
                icon={<MdWorkOutline className="text-22px" />}
                href="/work"
                isSpreaded={isSpreaded}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
