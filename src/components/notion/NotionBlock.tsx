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
import ToggleBlock from "./ToggleBlock";
import ImageBlock from "./ImageBlock";
import BookmarkBlock from "./BookmarkBlock";
import StudyBlockList from "../study/StudyBlockList";
import ChildPageBlock from "./ChildPageBlock";
import LinkPreviewBlock from "./LinkPreviewBlock";
import TableOfContentsBlock from "./TableOfContentsBlock";

interface NotionBlockProps {
  block: Block;
}
export default function NotionBlock({ block }: NotionBlockProps) {
  const { type } = block;

  switch (type) {
    case BlockType.quote:
      return (
        <QuoteBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </QuoteBlock>
      );
    case BlockType.heading_1:
    case BlockType.heading_2:
    case BlockType.heading_3:
      return <HeadingBlock block={block} />;
    case BlockType.bulleted_list_item:
      return (
        <BulletedListItemBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </BulletedListItemBlock>
      );
    case BlockType.numbered_list_item:
      return (
        <NumberedListItemBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </NumberedListItemBlock>
      );
    case BlockType.callout:
      return (
        <CalloutBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </CalloutBlock>
      );
    case BlockType.paragraph:
      return (
        <ParagraphBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </ParagraphBlock>
      );
    case BlockType.column_list:
      return <ColumnListBlock block={block} />;
    case BlockType.column:
      return <ColumnBlock block={block} />;
    case BlockType.code:
      return <CodeBlock block={block} />;
    case BlockType.divider:
      return <DividerBlock />;
    case BlockType.to_do:
      return (
        <ToDoBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </ToDoBlock>
      );
    case BlockType.table:
      return <TableBlock block={block} />;
    case BlockType.toggle:
      return (
        <ToggleBlock block={block}>
          <StudyBlockList pageId={block.id} />
        </ToggleBlock>
      );
    case BlockType.image:
      return <ImageBlock block={block} />;
    case BlockType.bookmark:
      return <BookmarkBlock block={block} />;
    case BlockType.child_page:
      return <ChildPageBlock block={block} />;
    case BlockType.link_preview:
      return <LinkPreviewBlock block={block} />;
    case BlockType.table_of_contents:
      return <TableOfContentsBlock block={block} />;
    default:
      return <div>NotionBlock</div>;
  }
}
