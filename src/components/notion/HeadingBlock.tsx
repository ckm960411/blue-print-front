import { getColorByBlockColor } from "@/utils/common/notion";
import { Block, BlockType } from "@/utils/types/notion";
import React from "react";

interface HeadingBlockProps {
  block: Block;
}
export default function HeadingBlock({ block }: HeadingBlockProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const { type } = block;

  if ([heading_1, heading_2, heading_3].includes(type)) {
    const {
      [type]: { rich_text },
    } = block;
    if (!rich_text) return <></>;

    return rich_text.map(({ annotations: { color }, text: { content } }, i) => {
      const getHeadingStyle = (headingType: typeof type) => {
        if (headingType === heading_1) return "text-28px my-8px";
        if (headingType === heading_2) return "text-24px my-6px";
        return "text-20px my-4px";
      };

      return (
        <div
          key={i}
          id={block.id}
          className={`font-bold leading-[140%] ${getHeadingStyle(
            type,
          )} ${getColorByBlockColor(color)}`}
        >
          {content}
        </div>
      );
    });
  }

  return <div>HeadingBlock</div>;
}
