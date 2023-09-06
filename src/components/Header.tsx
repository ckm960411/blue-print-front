import Link from 'next/link';
import React from 'react';

export default function Header() {
  const navLinkClass =
    'text-18px font-medium text-gray-600 px-16px hover:text-main';

  return (
    <header className="border-b border-gray-200 h-64px">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between w-full px-16px">
        <nav className="flex items-center h-full">
          <Link href="/" className="text-24px font-semibold text-main">
            BluePrint.Dev
          </Link>
          <ul className="flex items-center ml-24px">
            <li className={navLinkClass}>
              <Link href="/">TECH</Link>
            </li>
            <li className={navLinkClass}>
              <Link href="/">STUDY</Link>
            </li>
            <li className={navLinkClass}>
              <Link href="/">TIL</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link href="/" className={navLinkClass}>
            ABOUT ME
          </Link>
        </div>
      </div>
    </header>
  );
}
