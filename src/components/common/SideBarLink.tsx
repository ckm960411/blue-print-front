"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useToggle } from "usehooks-ts";
import ToggleButton from "@/components/components/ToggleButton";

interface SideBarLinkProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  isSpreaded: boolean;
}
export default function SideBarLink({
  title,
  icon,
  href,
  isSpreaded,
}: SideBarLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, onToggle] = useToggle(true);

  const isActive = pathname.startsWith(href);

  return (
    <div
      onClick={() => router.push(href)}
      className={`w-full cursor-pointer overflow-hidden rounded-10px border border-white text-18px font-medium text-gray-600 duration-200 hover:bg-white hover:text-main ${
        isActive ? "border-gray-300 bg-white text-main shadow-md" : ""
      } `}
    >
      <div
        className={`flex h-56px items-center justify-between gap-12px ${
          isSpreaded ? "justify-start pl-16px" : "justify-center"
        }`}
      >
        <div className="flex h-56px items-center gap-12px">
          <div>{icon}</div>
          <span className={isSpreaded ? "block" : "hidden"}>{title}</span>
        </div>
        {isActive && (
          <div className="pr-16px">
            <ToggleButton open={open} onToggle={onToggle} w={16} h={16} />
          </div>
        )}
      </div>
      {isActive && open && (
        <div className="w-full px-12px pb-12px">
          <ul className="flex max-h-[240px] flex-col gap-16px overflow-y-scroll rounded-10px bg-gray-50 p-8px text-14px leading-[150%] text-gray-600">
            <li>
              <p className="font-semibold">카테고리명</p>
              <hr className="my-4px" />
              <ul className="flex flex-col gap-4px text-12px leading-[140%]">
                <li>작은 카테고리1</li>
                <li>작은 카테고리2</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">카테고리명</p>
              <hr className="my-4px" />
              <ul className="flex flex-col gap-4px text-12px leading-[140%]">
                <li>작은 카테고리1</li>
                <li>작은 카테고리2</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">카테고리명</p>
              <hr className="my-4px" />
              <ul className="flex flex-col gap-4px text-12px leading-[140%]">
                <li>작은 카테고리1</li>
                <li>작은 카테고리2</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">카테고리명</p>
              <hr className="my-4px" />
              <ul className="flex flex-col gap-4px text-12px leading-[140%]">
                <li>작은 카테고리1</li>
                <li>작은 카테고리2</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
