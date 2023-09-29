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
      <div className="flex flex-col gap-8px">
        {blocks.map((block) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}
