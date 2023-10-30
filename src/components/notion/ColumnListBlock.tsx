"use client";

import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import React, { useEffect, useState } from "react";
import ColumnBlock from "./ColumnBlock";

interface ColumnListBlockProps {
  block: Block;
}
export default function ColumnListBlock({ block }: ColumnListBlockProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    getNotionBlockList(block.id)
      .then(({ results }) => setBlocks(results))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-16px pb-8px md:grid-cols-2">
      {blocks.map((block) => (
        <ColumnBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
