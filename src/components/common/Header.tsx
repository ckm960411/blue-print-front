'use client';

import { Z_INDEX } from "@/utils/common";
import React from "react";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  return (
    <header
      className="sticky top-0 h-72px border-b border-gray-200 bg-white"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      <div className="flex h-full w-full items-center gap-16px px-24px">
        <div className="grow">
          <div className="hidden w-360px items-center gap-12px rounded-10px border border-gray-200 bg-gray-50 px-16px py-6px md:flex">
            <BiSearch className="h-20px w-20px text-gray-800" />
            <input
              placeholder="원하는 키워드로 검색해보세요!"
              className="grow bg-gray-50 placeholder:text-14px"
            />
            <button className="rounded-10px border border-gray-200 p-8px text-14px text-gray-600 duration-200 hover:bg-main hover:text-white hover:shadow-lg">
              검색
            </button>
          </div>
          <div className="block text-24px font-bold text-gray-800 md:hidden">
            <span className="text-main">BluePrint</span>.Dev
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-16px">
          <button className="flex-center h-42px w-42px rounded-10px border border-gray-200 text-gray-800 duration-200 hover:bg-main hover:text-white hover:shadow-lg md:hidden">
            <BiSearch className="h-20px w-20px" />
          </button>
          <button className="h-42px w-76px rounded-10px border border-gray-200 text-16px font-medium duration-200 hover:bg-main hover:text-white hover:shadow-lg">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
