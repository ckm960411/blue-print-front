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
import HeadingBlockWrapper from "./HeadingBlockWrapper";
import BlockMaxWidthWrapper from "@/components/notion/components/BlockMaxWidthWrapper";

interface NotionBlockProps {
  block: Block;
  depth?: number;
}
export default function NotionBlock({ block, depth = 0 }: NotionBlockProps) {
  const { type } = block;

  switch (type) {
    case BlockType.quote:
      return <QuoteBlock block={block} />;
    case BlockType.heading_1:
    case BlockType.heading_2:
    case BlockType.heading_3:
      return <HeadingBlockWrapper block={block} />;
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
    // case BlockType.table:
    //   return (
    //     <BlockMaxWidthWrapper depth={depth + 1}>
    //       <TableBlock block={block} />
    //     </BlockMaxWidthWrapper>
    //   );
    // case BlockType.toggle:
    //   return (
    //     <ToggleBlock block={block}>
    //       <StudyBlockList pageId={block.id} depth={depth + 1} />
    //     </ToggleBlock>
    //   );
    // case BlockType.image:
    //   return <ImageBlock block={block} />;
    // case BlockType.bookmark:
    //   return <BookmarkBlock block={block} />;
    // case BlockType.child_page:
    //   return <ChildPageBlock block={block} />;
    // case BlockType.link_preview:
    //   return <LinkPreviewBlock block={block} />;
    // case BlockType.table_of_contents:
    //   return <TableOfContentsBlock block={block} blocks={blocks} />;
    default:
      return <div>NotionBlock</div>;
  }
}
