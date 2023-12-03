import { Block } from "@/utils/types/notion";

interface BlockListProps {
  blocks: Block[];
}
export default function BlockList({ blocks }: Readonly<BlockListProps>) {
  return (
    <div>
      {blocks.map((block) => (
        <div key={block.id}>{block.type}</div>
      ))}
    </div>
  );
}
