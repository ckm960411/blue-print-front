import { Block } from "@/utils/types/notion";
import React from "react";

interface ParagraphBlockProps {
  block: Block;
}
export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  return <div>ParagraphBlock</div>;
}
