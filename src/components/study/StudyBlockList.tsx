import { getNotionBlockList } from "@/utils/services/notion";
import React from "react";

interface StudyBlockListProps {
  pageId: string;
}
export default async function StudyBlockList({ pageId }: StudyBlockListProps) {
  const { results: blocks } = await getNotionBlockList(pageId);

  return (
    <div>
      {blocks.map((block) => (
        <div key={block.id}>1</div>
      ))}
    </div>
  );
}
