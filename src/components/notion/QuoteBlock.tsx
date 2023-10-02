import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface QuoteBlockProps {
  block: Block;
}
export default function QuoteBlock({ block }: QuoteBlockProps) {
  const {
    quote: { rich_text },
  } = block;

  if (!rich_text) return <></>;

  return (
    <div className="my-4px rounded-r-10px border-l-2 border-gray-800 bg-blue-50 py-4px pl-12px pr-2px text-16px font-medium leading-[140%]">
      <RichText richText={rich_text} />
    </div>
  );
}
