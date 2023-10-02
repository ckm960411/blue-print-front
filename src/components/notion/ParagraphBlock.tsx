import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface ParagraphBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function ParagraphBlock({
  block,
  children,
}: ParagraphBlockProps) {
  const {
    paragraph: { rich_text },
    has_children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div>
      <p>
        <RichText richText={rich_text} />
      </p>
      {has_children && <div className="mt-8px pl-24px">{children}</div>}
    </div>
  );
}
