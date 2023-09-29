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
import ToDoBlock from "./ToDoBlock";
import TableBlock from "./TableBlock";
import TableRowBlock from "./TableRowBlock";
import ToggleBlock from "./ToggleBlock";
import ImageBlock from "./ImageBlock";
import BookmarkBlock from "./BookmarkBlock";

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
    case BlockType.paragraph:
      return <ParagraphBlock block={block} />;
    case BlockType.column_list:
      return <ColumnListBlock block={block} />;
    case BlockType.column:
      return <ColumnBlock block={block} />;
    case BlockType.code:
      return <CodeBlock block={block} />;
    case BlockType.divider:
      return <DividerBlock />;
    case BlockType.to_do:
      return <ToDoBlock block={block} />;
    case BlockType.table:
      return <TableBlock block={block} />;
    case BlockType.table_row:
      return <TableRowBlock block={block} />;
    case BlockType.toggle:
      return <ToggleBlock block={block} />;
    case BlockType.image:
      return <ImageBlock block={block} />;
    case BlockType.bookmark:
      return <BookmarkBlock block={block} />;
    default:
      return <div>NotionBlock</div>;
  }
}
