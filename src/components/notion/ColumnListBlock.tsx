import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import React from "react";
import ColumnBlock from "./ColumnBlock";

interface ColumnListBlockProps {
  block: Block;
}
export default async function ColumnListBlock({ block }: ColumnListBlockProps) {
  const { results: columns } = await getNotionBlockList(block.id);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((col) => (
        <ColumnBlock key={col.id} block={block} />
      ))}
    </div>
  );
}
