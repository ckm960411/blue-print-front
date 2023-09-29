import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface ParagraphBlockProps {
  block: Block;
}
export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  if (block.type !== BlockType.paragraph) return <></>;

  const { paragraph } = block;
  const { rich_text } = paragraph;

  if (!rich_text) return <></>;

  return (
    <p>
      <RichText richText={rich_text} />
    </p>
  );
}
