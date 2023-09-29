import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import ParagraphBlock from "./ParagraphBlock";

interface NotionBlockProps {
  block: Block;
}
export default function NotionBlock({ block }: NotionBlockProps) {
  const { type } = block;

  if (type === BlockType.pragraph) {
    return <ParagraphBlock block={block} />;
  }

  return <div>NotionBlock</div>;
}
