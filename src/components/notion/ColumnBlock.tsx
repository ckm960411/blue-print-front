import { Block } from "@/utils/types/notion";
import React from "react";
import StudyBlockList from "../study/StudyBlockList";

interface ColumnBlockProps {
  block: Block;
  order?: number;
}
export default async function ColumnBlock({ block, order }: ColumnBlockProps) {
  return (
    <div>
      {order && <div className="mb-6px text-12px text-gray-400">{order})</div>}
      <StudyBlockList pageId={block.id} />
    </div>
  );
}
