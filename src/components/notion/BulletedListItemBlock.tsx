import BlockList from "@/components/study/BlockList";
import { Block } from "@/utils/types/notion";
import React from "react";
import { BsDot } from "react-icons/bs";
import RichText from "./RichText";

interface BulletedListItemBlockProps {
  block: Block;
}
export default function BulletedListItemBlock({
  block,
}: BulletedListItemBlockProps) {
  const {
    bulleted_list_item: { rich_text },
    children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div>
      <p className="flex items-start">
        <BsDot className="h-22px w-22px flex-shrink-0" />
        <RichText richText={rich_text} />
      </p>
      {children && <BlockList blocks={children} />}
    </div>
  );
}
