import { Block } from "@/utils/types/notion";
import React from "react";
import { BsDot } from "react-icons/bs";
import RichText from "./RichText";

interface NumberedListItemBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function NumberedListItemBlock({
  block,
  children,
}: NumberedListItemBlockProps) {
  const {
    numbered_list_item: { rich_text },
    has_children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div>
      <p className="flex items-start">
        <BsDot className="h-22px w-22px flex-shrink-0" />
        <RichText richText={rich_text} />
      </p>
      {has_children && <div className="mt-8px pl-24px">{children}</div>}
    </div>
  );
}
