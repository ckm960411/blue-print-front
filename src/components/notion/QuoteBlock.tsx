import { getColorByBlockColor } from "@/utils/common/notion";
import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface QuoteBlockProps {
  block: Block;
}
export default function QuoteBlock({ block }: QuoteBlockProps) {
  if (block.type !== BlockType.quote) return <></>;

  const { quote } = block;
  const { rich_text } = quote;

  if (!rich_text) return <></>;

  return (
    <div className="border-l-2 border-gray-800 py-4px pl-12px text-16px font-medium">
      <RichText richText={rich_text} />
    </div>
  );
}
