import NotionBlock from "@/components/notion/NotionBlock";
import { Block } from "@/utils/types/notion";

interface BlockListProps {
  blocks: Block[];
  depth?: number;
}
export default function BlockList({ blocks, depth }: Readonly<BlockListProps>) {
  return (
    <div>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} depth={depth} />
      ))}
    </div>
  );
}
