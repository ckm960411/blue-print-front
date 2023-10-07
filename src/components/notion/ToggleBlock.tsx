"use client";

import { Block } from "@/utils/types/notion";
import React, { useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useToggle } from "usehooks-ts";
import ToggleButton from "@/components/components/ToggleButton";

interface ToggleBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function ToggleBlock({ block, children }: ToggleBlockProps) {
  const [open, onToggle] = useToggle();

  const {
    toggle: { rich_text },
    has_children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div className="flex flex-col">
      <div className={`flex gap-8px ${has_children ? "" : "text-gray-500"}`}>
        <ToggleButton open={open} onToggle={onToggle} />
        <p>
          <RichText richText={rich_text} />
        </p>
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
