import { getColorByBlockColor } from "@/utils/common/notion";
import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import { BsDot } from "react-icons/bs";
import RichText from "./RichText";

interface NumberedListItemBlockProps {
  block: Block;
}
export default function NumberedListItemBlock({
  block,
}: NumberedListItemBlockProps) {
  if (block.type !== BlockType.numbered_list_item) return <></>;

  const { numbered_list_item } = block;
  const { rich_text } = numbered_list_item;

  if (!rich_text) return <></>;

  return (
    <p className="flex items-start">
      <BsDot className="h-22px w-22px flex-shrink-0" />
      <RichText richText={rich_text} />
    </p>
  );
}
