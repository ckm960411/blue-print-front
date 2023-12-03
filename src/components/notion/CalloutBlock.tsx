import BlockList from "@/components/study/BlockList";
import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";
import NotionIcon from "./NotionIcon";

interface CalloutBlockProps {
  block: Block;
}
export default function CalloutBlock({ block }: CalloutBlockProps) {
  const {
    callout: { rich_text, icon },
    children,
  } = block;

  if (!rich_text || !icon) return <></>;

  return (
    <div className="my-8px rounded-10px bg-blue-50 p-16px">
      <div className="flex items-start gap-16px">
        <NotionIcon icon={icon} />
        <div className="w-full">
          <div>
            <RichText richText={rich_text} />
          </div>
          {children && <BlockList blocks={children} />}
        </div>
      </div>
    </div>
  );
}
