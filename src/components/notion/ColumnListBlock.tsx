import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import React, { useEffect } from "react";
import ColumnBlock from "./ColumnBlock";

interface ColumnListBlockProps {
  block: Block;
}
export default async function ColumnListBlock({ block }: ColumnListBlockProps) {
  const { results: blocks } = await getNotionBlockList(block.id);

  return (
    <div
      className="grid gap-16px pb-8px"
      style={{ gridTemplateColumns: `repeat(${blocks.length}, 1fr)` }}
    >
      {blocks.map((block, index) => (
        <ColumnBlock key={block.id} block={block} order={index + 1} />
      ))}
    </div>
  );
}
