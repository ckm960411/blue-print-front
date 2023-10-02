import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface QuoteBlockProps {
  block: Block;
  children?: React.ReactNode;
}
export default function QuoteBlock({ block, children }: QuoteBlockProps) {
  const {
    quote: { rich_text },
    has_children,
  } = block;

  if (!rich_text) return <></>;

  return (
    <div className="my-4px border-l-2 border-gray-800 py-4px pl-12px pr-2px">
      <p className="text-16px font-medium leading-[140%]">
        <RichText richText={rich_text} />
      </p>
      {has_children && <div className="mt-8px">{children}</div>}
    </div>
  );
}
