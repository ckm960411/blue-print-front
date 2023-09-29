import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";
import Image from "next/image";
import NotionIcon from "./NotionIcon";

interface CalloutBlockProps {
  block: Block;
}
export default function CalloutBlock({ block }: CalloutBlockProps) {
  if (block.type !== BlockType.callout) return <></>;

  const { callout } = block;
  const { rich_text, icon } = callout;

  if (!rich_text || !icon) return <></>;

  return (
    <div className="flex items-start gap-16px rounded-10px bg-blue-50 p-16px">
      <NotionIcon icon={icon} />
      <RichText richText={rich_text} />
    </div>
  );
}
