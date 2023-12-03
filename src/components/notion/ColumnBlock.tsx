import BlockList from "@/components/study/BlockList";
import { Block } from "@/utils/types/notion";
import React from "react";

interface ColumnBlockProps {
  block: Block;
}
export default function ColumnBlock({ block }: ColumnBlockProps) {
  return <div>{block.children && <BlockList blocks={block.children} />}</div>;
}
