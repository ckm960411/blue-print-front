"use client";

import React from "react";
import { Block } from "@/utils/types/notion";
import ColumnBlock from "@/components/notion/ColumnBlock";

interface ColumnListBlockProps {
  block: Block;
}
export default function ColumnListBlock({ block }: ColumnListBlockProps) {
  if (!block.children) return <></>;

  return (
    <div className="grid grid-cols-1 gap-16px pb-8px md:grid-cols-2">
      {block.children?.map((block) => (
        <ColumnBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
