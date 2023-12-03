import BlockList from "@/components/study/BlockList";
import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import ToggleHeadingBlock from "./ToggleHeadingBlock";
import HeadingBlock from "./HeadingBlock";

interface HeadingBlockWrapperProps {
  block: Block;
}
export default function HeadingBlockWrapper({
  block,
}: HeadingBlockWrapperProps) {
  const { heading_1, heading_2, heading_3 } = BlockType;

  const { type, children } = block;

  if ([heading_1, heading_2, heading_3].includes(type)) {
    const {
      [type]: { is_toggleable },
    } = block;

    if (is_toggleable) {
      return (
        <ToggleHeadingBlock
          block={block}
          heading={<HeadingBlock block={block} />}
        >
          {children && <BlockList blocks={children} />}
        </ToggleHeadingBlock>
      );
    }

    return <HeadingBlock block={block} />;
  }

  return <div>HeadingBlock</div>;
}
