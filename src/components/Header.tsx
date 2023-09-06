import Link from 'next/link';
import React from 'react';

export default function Header() {
  const navLinkClass =
    'text-18px font-medium text-gray-600 px-16px hover:text-main';

  return (
    <header className="border-b border-gray-200 h-64px">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between w-full px-16px">
        <nav className="flex items-center h-full">
          <Link href="/" className="text-24px font-semibold text-main">
            BluePrint.Dev
          </Link>
          <ul className="flex items-center ml-24px">
            <li className={navLinkClass}>
              <Link href="/tech">TECH</Link>
            </li>
            <li className={navLinkClass}>
              <Link href="/study">STUDY</Link>
            </li>
            <li className={navLinkClass}>
              <Link href="/work">WORK</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link href="/about" className={navLinkClass}>
            ABOUT ME
          </Link>
        </div>
      </div>
    </header>
  );
}
