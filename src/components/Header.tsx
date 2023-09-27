import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  const navLinkClass =
    "text-18px font-medium text-gray-600 px-16px hover:text-main";

  return (
    <header className="h-72px border-b border-gray-200">
      <div className="flex h-full w-full items-center px-24px">
        <div className="grow">
          <div className="flex w-360px items-center gap-12px rounded-10px border border-gray-200 bg-gray-50 px-16px py-6px">
            <BiSearch className="h-20px w-20px text-gray-800" />
            <input
              placeholder="원하는 키워드로 검색해보세요!"
              className="grow bg-gray-50 placeholder:text-14px"
            />
            <button className="rounded-10px border border-gray-200 p-8px text-14px text-gray-600 duration-200 hover:text-main">
              search
            </button>
          </div>
        </div>
        <div>
          <button className="rounded-10px border border-gray-200 px-16px py-12px text-16px font-medium duration-200 hover:bg-main hover:text-white hover:shadow-lg">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
}
