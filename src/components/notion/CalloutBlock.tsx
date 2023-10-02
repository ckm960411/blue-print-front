import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";
import NotionIcon from "./NotionIcon";

interface CalloutBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function CalloutBlock({ block, children }: CalloutBlockProps) {
  const {
    callout: { rich_text, icon },
    has_children,
  } = block;

  if (!rich_text || !icon) return <></>;

  return (
    <div className="my-8px rounded-10px bg-blue-50 p-16px">
      <div className="flex items-start gap-16px">
        <NotionIcon icon={icon} />
        <div>
          <div>
            <RichText richText={rich_text} />
          </div>
          {has_children && <div className="mt-8px">{children}</div>}
        </div>
      </div>
    </div>
  );
}
