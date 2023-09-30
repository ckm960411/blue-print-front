"use client";

import { getNotionBlockList } from "@/utils/services/notion";
import { Block, BlockType } from "@/utils/types/notion";
import React, { useEffect, useState } from "react";
import RichText from "./RichText";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface TableOfContentsBlockProps {
  block: Block;
}
export default function TableOfContentsBlock({
  block,
}: TableOfContentsBlockProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const [headings, setHeadings] = useState<Block[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickHeading = (
    e: React.MouseEvent<HTMLParagraphElement>,
    headingId: string,
  ) => {
    e.preventDefault();
    const headingEl = document.querySelector(`#${headingId}`) as
      | HTMLElement
      | undefined;
    const headingScrollTop = headingEl?.offsetTop;
    const NAVBAR_HEIGHT = 70;
    const PADDING = 16;

    window.scrollTo({
      top: headingScrollTop ? headingScrollTop - (NAVBAR_HEIGHT + PADDING) : 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getNotionBlockList(block.parent.page_id)
      .then(({ results }) => {
        setHeadings(
          results.filter((block) =>
            [heading_1, heading_2, heading_3].includes(block.type),
          ),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <div className="rounded-10px border border-gray-200 p-20px text-16px font-medium text-gray-600">
      <div className="flex items-center justify-between">
        <p className="text-22px font-bold text-gray-800">목차</p>
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
        className={`mt-24px flex flex-col gap-8px overflow-hidden ${
          open ? "mt-24px h-auto" : "mt-0px h-0px"
        }`}
      >
        {headings.map((heading) => (
          <p
            key={heading.id}
            onClick={(e) => handleClickHeading(e, heading.id)}
            className="underline"
          >
            {heading.heading_1 ? (
              <p className="cursor-pointer text-22px leading-[140%]">
                {heading.heading_1.rich_text && (
                  <RichText richText={heading.heading_1.rich_text} />
                )}
              </p>
            ) : heading.heading_2 ? (
              <p className="cursor-pointer text-18px leading-[140%]">
                {heading.heading_2.rich_text && (
                  <RichText richText={heading.heading_2.rich_text} />
                )}
              </p>
            ) : (
              <p className="cursor-pointer text-16px leading-[140%]">
                {heading.heading_3.rich_text && (
                  <RichText richText={heading.heading_3.rich_text} />
                )}
              </p>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
