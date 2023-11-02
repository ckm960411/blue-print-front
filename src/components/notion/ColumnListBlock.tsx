"use client";

import React from "react";
import { useNotionBlockList } from "@/utils/hooks/react-query/useNotionBlockList";
import { Block } from "@/utils/types/notion";
import ColumnBlock from "@/components/notion/ColumnBlock";

interface ColumnListBlockProps {
  block: Block;
}
export default function ColumnListBlock({ block }: ColumnListBlockProps) {
  const { data } = useNotionBlockList(block.id);

  if (!data) return <></>;

  const { results: blocks } = data;

  return (
    <div className="grid grid-cols-1 gap-16px pb-8px md:grid-cols-2">
      {blocks.map((block) => (
        <ColumnBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
