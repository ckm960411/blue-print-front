import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import ParagraphBlock from "./ParagraphBlock";
import QuoteBlock from "./QuoteBlock";
import HeadingBlock from "./HeadingBlock";
import BulletedListItemBlock from "./BulletedListItemBlock";
import NumberedListItemBlock from "./NumberedListItemBlock";
import CalloutBlock from "./CalloutBlock";
import ColumnListBlock from "./ColumnListBlock";
import ColumnBlock from "./ColumnBlock";
import CodeBlock from "./CodeBlock";
import DividerBlock from "./DividerBlock";

interface NotionBlockProps {
  block: Block;
}
export default function NotionBlock({ block }: NotionBlockProps) {
  const { type } = block;

  switch (type) {
    case BlockType.quote:
      return <QuoteBlock block={block} />;
    case BlockType.heading_1:
    case BlockType.heading_2:
    case BlockType.heading_3:
      return <HeadingBlock block={block} />;
    case BlockType.bulleted_list_item:
      return <BulletedListItemBlock block={block} />;
    case BlockType.numbered_list_item:
      return <NumberedListItemBlock block={block} />;
    case BlockType.callout:
      return <CalloutBlock block={block} />;
    case BlockType.pragraph:
      return <ParagraphBlock block={block} />;
    case BlockType.column_list:
      return <ColumnListBlock block={block} />;
    case BlockType.column:
      return <ColumnBlock block={block} />;
    case BlockType.code:
      return <CodeBlock block={block} />;
    case BlockType.divider:
      return <DividerBlock block={block} />;
    default:
      return <div>NotionBlock</div>;
  }
}
