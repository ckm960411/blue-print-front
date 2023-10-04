"use client";

import React, { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import RichText from "./RichText";
import { Block, BlockType } from "@/utils/types/notion";

interface ToggleHeadingBlockProps {
  block: Block;
  heading: React.ReactNode;
  children: React.ReactNode;
}
export default function ToggleHeadingBlock({
  block,
  heading,
  children,
}: ToggleHeadingBlockProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const [open, setOpen] = useState(false);

  const { type, has_children } = block;

  if ([heading_1, heading_2, heading_3].includes(type)) {
    const {
      [type]: { rich_text, color },
    } = block;
    if (!rich_text) return <></>;

    return (
      <div>
        <div
          className={`flex items-center gap-8px ${
            has_children ? "" : "text-gray-500"
          }`}
        >
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`flex-center h-24px w-24px duration-200 ${
              open ? "-rotate-180" : ""
            }`}
          >
            <TbTriangleInvertedFilled />
          </button>
          {heading}
        </div>
        {has_children && (
          <div
            className={`overflow-hidden pl-24px pt-16px ${
              open ? "h-auto" : "h-0px"
            }`}
          >
            <div className="rounded-10px border border-main p-16px shadow-md">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <></>;
}
