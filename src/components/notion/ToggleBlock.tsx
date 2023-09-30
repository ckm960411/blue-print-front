"use client";

import { Block } from "@/utils/types/notion";
import React, { useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface ToggleBlockProps {
  block: Block;
}
export default function ToggleBlock({ block }: ToggleBlockProps) {
  const [open, setOpen] = useState(false);

  const { toggle } = block;
  const { rich_text } = toggle;

  if (!rich_text) return <></>;

  return (
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
  );
}
