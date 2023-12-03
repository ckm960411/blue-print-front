import BlockList from "@/components/study/BlockList";
import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface ParagraphBlockProps {
  block: Block;
}
export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  const {
    paragraph: { rich_text },
    children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div>
      <p>
        <RichText richText={rich_text} />
      </p>
      {children && <BlockList blocks={children} />}
    </div>
  );
}
