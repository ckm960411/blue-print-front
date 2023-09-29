import { Block } from "@/utils/types/notion";
import React from "react";

interface HeadingBlockProps {
  block: Block;
}
export default function HeadingBlock({ block }: HeadingBlockProps) {
  return <div>HeadingBlock</div>;
}
