import { getNotionBlockList } from "@/utils/services/notion";
import React from "react";
import NotionBlock from "../notion/NotionBlock";

interface StudyBlockListProps {
  pageId: string;
  depth?: number;
}
export default async function StudyBlockList({
  pageId,
  depth,
}: StudyBlockListProps) {
  const { results: blocks } = await getNotionBlockList(pageId);

  if (!blocks) return <></>;

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="flex flex-col gap-8px break-all">
        {blocks.map((block) => (
          <NotionBlock
            key={block.id}
            block={block}
            blocks={blocks}
            depth={depth}
          />
        ))}
      </div>
    </div>
  );
}
