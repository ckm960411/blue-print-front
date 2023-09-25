import Link from 'next/link';
import React from 'react';
import SideBarLink from './SideBarLink';
import { AiOutlineLaptop } from 'react-icons/ai';
import { BsJournalBookmark } from 'react-icons/bs';
import { MdWorkOutline } from 'react-icons/md';

export default function SideBar() {
  return (
    <div className="flex-shrink-0 w-240px h-full min-h-screen border-r border-gray-200 bg-white">
      <div className="h-72px flex items-center px-16px">
        <Link href="/" className="text-24px font-semibold text-gray-800 p-8px">
          <span className="text-main">BluePrint</span>.Dev
        </Link>
      </div>
      <div className="px-16px py-32px">
        <ul className="flex flex-col gap-12px">
          <SideBarLink href="/tech">
            <AiOutlineLaptop className="text-20px" />
            <span>TECH</span>
          </SideBarLink>
          <SideBarLink href="/study">
            <BsJournalBookmark className="text-20px" />
            <span>STUDY</span>
          </SideBarLink>
          <SideBarLink href="/work">
            <MdWorkOutline className="text-20px" />
            <span>WORK</span>
          </SideBarLink>
        </ul>
      </div>
    </div>
  );
}
