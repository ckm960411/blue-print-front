import React from "react";
import { useNotionBlockList } from "@/utils/hooks/react-query/useNotionBlockList";
import NotionBlock from "@/components/notion/NotionBlock";

interface StudyBlockListProps {
  pageId: string;
  depth?: number;
}
export default function StudyBlockList({ pageId, depth }: StudyBlockListProps) {
  const { data } = useNotionBlockList(pageId);

  if (!data) return <></>;

  const { results: blocks } = data;

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
