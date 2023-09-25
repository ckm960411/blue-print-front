import Link from 'next/link';
import React from 'react';
import SideBarLink from './SideBarLink';

const navLinkClass =
  'w-full text-18px font-medium text-gray-600 hover:text-main py-12px px-16px rounded-xl hover:shadow-lg hover:bg-white duration-200';

export default function SideBar() {
  return (
    <div className="flex-shrink-0 w-240px h-full min-h-screen border-r border-gray-200">
      <div className="h-72px flex items-center px-16px">
        <Link href="/" className="text-24px font-semibold text-gray-800 p-8px">
          <span className="text-main">BluePrint</span>.Dev
        </Link>
      </div>
      <div className="px-16px py-32px">
        <ul className="flex flex-col gap-12px">
          <SideBarLink title="TECH" href="/tech" />
          <SideBarLink title="STUDY" href="/study" />
          <SideBarLink title="WORK" href="/work" />
        </ul>
      </div>
    </div>
  );
}
