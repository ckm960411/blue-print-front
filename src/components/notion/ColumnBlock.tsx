import { Block } from "@/utils/types/notion";
import React from "react";
import StudyBlockList from "../study/StudyBlockList";

interface ColumnBlockProps {
  block: Block;
}
export default async function ColumnBlock({ block }: ColumnBlockProps) {
  return (
    <div>
      <StudyBlockList pageId={block.id} />
    </div>
  );
}
