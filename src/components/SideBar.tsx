import Link from "next/link";
import React from "react";
import SideBarLink from "./SideBarLink";
import { AiOutlineLaptop } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";

export default function SideBar() {
  return (
    <div className="h-full min-h-screen w-88px flex-shrink-0 border-r border-gray-200 bg-white lg:w-240px">
      <div className="flex h-72px items-center px-16px">
        <Link href="/" className="p-8px text-24px font-semibold text-gray-800">
          <span className="hidden lg:block">
            <span className="text-main">BluePrint</span>.Dev
          </span>
          <span className="block lg:hidden">
            <span className="text-main">BP</span>
          </span>
        </Link>
      </div>
      <div className="px-16px py-32px">
        <ul className="flex flex-col gap-12px">
          <SideBarLink href="/tech">
            <AiOutlineLaptop className="text-20px" />
            <span className="hidden lg:block">TECH</span>
          </SideBarLink>
          <SideBarLink href="/study">
            <BsJournalBookmark className="text-20px" />
            <span className="hidden lg:block">STUDY</span>
          </SideBarLink>
          <SideBarLink href="/work">
            <MdWorkOutline className="text-20px" />
            <span className="hidden lg:block">WORK</span>
          </SideBarLink>
        </ul>
      </div>
    </div>
  );
}
