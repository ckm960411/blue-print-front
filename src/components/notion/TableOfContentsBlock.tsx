"use client";

import { Block, BlockType } from "@/utils/types/notion";
import React, { useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface TableOfContentsBlockProps {
  block: Block;
  blocks: Block[];
}
export default function TableOfContentsBlock({
  block,
  blocks,
}: TableOfContentsBlockProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const [open, setOpen] = useState(false);

  const handleClickHeading = (
    e: React.MouseEvent<HTMLParagraphElement>,
    headingId: string,
  ) => {
    e.preventDefault();
    const headingEl = document.getElementById(`${headingId}`);
    const headingScrollTop = headingEl?.offsetTop;
    const NAVBAR_HEIGHT = 70;
    const PADDING = 16;

    window.scrollTo({
      top: headingScrollTop ? headingScrollTop - (NAVBAR_HEIGHT + PADDING) : 0,
      behavior: "smooth",
    });
  };

  const headings = blocks.filter((block) =>
    [heading_1, heading_2, heading_3].includes(block.type),
  );

  return (
    <div className="rounded-10px border border-gray-200 bg-white p-12px text-16px font-medium text-gray-600 md:p-20px">
      <div className="flex items-center justify-between">
        <p className="text-18px font-bold text-gray-800 md:text-22px">목차</p>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`flex-center h-32px w-32px rounded-10px duration-200 hover:border hover:border-blue-300 hover:shadow-md ${
            open ? "-rotate-180" : ""
          }`}
        >
          <TbTriangleInvertedFilled />
        </button>
      </div>
      <div
        className={`flex flex-col gap-8px overflow-hidden font-medium ${
          open ? "h-auto pt-24px" : "h-0px pt-0px"
        }`}
      >
        {headings.map((heading) => (
          <p
            key={heading.id}
            onClick={(e) => handleClickHeading(e, heading.id)}
            className="truncate-1-lines underline"
          >
            {heading.heading_1 ? (
              <span className="cursor-pointer text-18px leading-[140%] md:text-22px md:leading-[140%]">
                {heading.heading_1.rich_text && (
                  <RichText
                    richText={heading.heading_1.rich_text}
                    defaultColor="text-gray-600"
                  />
                )}
              </span>
            ) : heading.heading_2 ? (
              <span className="cursor-pointer text-16px leading-[140%] md:text-18px md:leading-[140%]">
                {heading.heading_2.rich_text && (
                  <RichText
                    richText={heading.heading_2.rich_text}
                    defaultColor="text-gray-600"
                  />
                )}
              </span>
            ) : (
              <span className="cursor-pointer text-14px leading-[140%] md:text-16px md:leading-[140%]">
                {heading.heading_3.rich_text && (
                  <RichText
                    richText={heading.heading_3.rich_text}
                    defaultColor="text-gray-600"
                  />
                )}
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
