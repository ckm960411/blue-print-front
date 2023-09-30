import { Block } from "@/utils/types/notion";
import React from "react";
import { BsDot } from "react-icons/bs";
import RichText from "./RichText";

interface NumberedListItemBlockProps {
  block: Block;
}
export default function NumberedListItemBlock({
  block,
}: NumberedListItemBlockProps) {
  const {
    numbered_list_item: { rich_text },
  } = block;

  if (!rich_text) return <></>;

  return (
    <p className="flex items-start">
      <BsDot className="h-22px w-22px flex-shrink-0" />
      <RichText richText={rich_text} />
    </p>
  );
}
