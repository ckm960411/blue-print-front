"use client";

import { Block } from "@/utils/types/notion";
import React, { useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface ToggleBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function ToggleBlock({ block, children }: ToggleBlockProps) {
  const [open, setOpen] = useState(false);

  const {
    toggle: { rich_text },
  } = block;

  if (!rich_text) return <></>;

  return (
    <div>
      <div className="flex gap-8px">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex-center h-24px w-24px duration-200 ${
            open ? "-rotate-180" : ""
          }`}
        >
          <TbTriangleInvertedFilled />
        </button>
        <p>
          <RichText richText={rich_text} />
        </p>
      </div>
      <div
        className={`overflow-hidden pl-24px pt-16px ${
          open ? "h-auto" : "h-0px"
        }`}
      >
        <div className="rounded-10px border border-main p-16px shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
