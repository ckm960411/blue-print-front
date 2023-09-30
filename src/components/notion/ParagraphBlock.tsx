import { Block } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";

interface ParagraphBlockProps {
  block: Block;
}
export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  const {
    paragraph: { rich_text },
  } = block;

  if (!rich_text) return <></>;

  return (
    <p>
      <RichText richText={rich_text} />
    </p>
  );
}
