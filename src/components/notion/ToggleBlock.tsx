"use client";

import { Block } from "@/utils/types/notion";
import React, { LegacyRef, useEffect, useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { getNotionBlockList } from "@/utils/services/notion";
import NotionBlock from "./NotionBlock";
import { useToggleShowing } from "@/utils/hooks/useToggleShowing";

interface ToggleBlockProps {
  block: Block;
}
export default function ToggleBlock({ block }: ToggleBlockProps) {
  const [open, setOpen] = useState(false);
  const [childBlocks, setChildBlocks] = useState<Block[]>([]);

  const { ref, containerHeight } = useToggleShowing(open, [childBlocks]);

  const { toggle, has_children } = block;
  const { rich_text } = toggle;

  useEffect(() => {
    if (!has_children) return;

    getNotionBlockList(block.id)
      .then(({ results }) => setChildBlocks(results))
      .catch(console.error);
  }, [has_children]);

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
        className={`overflow-hidden`}
        style={{
          height: open ? containerHeight : 0,
          transitionDuration: "200ms",
        }}
      >
        <div
          ref={ref as LegacyRef<HTMLDivElement>}
          className={`pl-24px pt-16px`}
        >
          <div className="rounded-10px border border-main p-16px shadow-md">
            {childBlocks.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
