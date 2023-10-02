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
    <div className="my-4px border-l-2 border-gray-800 py-4px pl-12px text-16px font-medium">
      <RichText richText={rich_text} />
    </div>
  );
}
