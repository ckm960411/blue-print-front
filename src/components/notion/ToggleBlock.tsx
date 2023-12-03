"use client";

import BlockList from "@/components/study/BlockList";
import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";
import { useToggle } from "usehooks-ts";
import ToggleButton from "@/components/components/ToggleButton";

interface ToggleBlockProps {
  block: Block;
}
export default function ToggleBlock({ block }: ToggleBlockProps) {
  const [open, onToggle] = useToggle();

  const {
    toggle: { rich_text },
    children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div className="flex flex-col">
      <div className={`flex gap-8px ${children ? "" : "text-gray-500"}`}>
        <ToggleButton open={open} onToggle={onToggle} />
        <p>
          <RichText richText={rich_text} />
        </p>
      </div>
      {children && (
        <div
          className={`overflow-hidden pl-24px pt-16px ${
            open ? "h-auto" : "h-0px"
          }`}
        >
          <div className="rounded-10px border border-main p-16px shadow-md">
            <BlockList blocks={children} />
          </div>
        </div>
      )}
    </div>
  );
}
