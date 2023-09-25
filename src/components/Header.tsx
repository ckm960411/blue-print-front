import Link from 'next/link';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function Header() {
  const navLinkClass =
    'text-18px font-medium text-gray-600 px-16px hover:text-main';

  return (
    <header className="border-b border-gray-200 h-72px">
      <div className="h-full w-full px-24px flex items-center">
        <div className="grow">
          <div className="bg-gray-50 w-360px py-6px px-16px rounded-xl border border-gray-200 flex items-center gap-12px">
            <BiSearch className="text-gray-800 w-20px h-20px" />
            <input
              placeholder="원하는 키워드로 검색해보세요!"
              className="grow bg-gray-50 placeholder:text-14px"
            />
            <button className="text-14px border border-gray-200 text-gray-600 p-8px rounded-md hover:text-main duration-200">
              search
            </button>
          </div>
        </div>
        <div>
          <button className="text-16px font-medium border border-gray-200 py-12px px-16px rounded-xl hover:bg-main hover:text-white hover:shadow-lg duration-200">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
}
