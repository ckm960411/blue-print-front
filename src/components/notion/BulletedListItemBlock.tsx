import { getColorByBlockColor } from "@/utils/common/notion";
import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import { BsDot } from "react-icons/bs";

interface BulletedListItemBlockProps {
  block: Block;
}
export default function BulletedListItemBlock({
  block,
}: BulletedListItemBlockProps) {
  if (block.type !== BlockType.bulleted_list_item) return <></>;

  const { bulleted_list_item } = block;
  const { rich_text } = bulleted_list_item;

  if (!rich_text) return <></>;

  return (
    <p className="flex items-start">
      <BsDot className="h-22px w-22px flex-shrink-0" />
      <span>
        {rich_text.map(({ annotations, text: { content } }, i) => {
          const { bold, color, underline } = annotations;
          return (
            <span
              key={i}
              className={`${bold ? "font-bold" : ""} ${
                underline ? "underline" : ""
              } ${getColorByBlockColor(color)}`}
            >
              {content}
            </span>
          );
        })}
      </span>
    </p>
  );
}
