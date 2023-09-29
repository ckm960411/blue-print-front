import { getNotionBlockList } from "@/utils/services/notion";
import React from "react";
import NotionBlock from "../notion/NotionBlock";

interface StudyBlockListProps {
  pageId: string;
}
export default async function StudyBlockList({ pageId }: StudyBlockListProps) {
  const { results: blocks } = await getNotionBlockList(pageId);

  return (
    <div className="mx-auto max-w-screen-xl">
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
