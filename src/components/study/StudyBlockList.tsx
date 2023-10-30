import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import React, { useEffect, useState } from "react";
import NotionBlock from "../notion/NotionBlock";

interface StudyBlockListProps {
  pageId: string;
  depth?: number;
}
export default function StudyBlockList({ pageId, depth }: StudyBlockListProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    getNotionBlockList(pageId)
      .then((data) => setBlocks(data.results))
      .catch(console.error);
  }, []);

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
