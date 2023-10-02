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
    <div className="grid grid-cols-1 gap-16px pb-8px md:grid-cols-2">
      {blocks.map((block) => (
        <ColumnBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
