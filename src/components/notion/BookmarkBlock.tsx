import { Block } from "@/utils/types/notion";
import React from "react";

interface BookmarkBlockProps {
  block: Block;
}
export default function BookmarkBlock({ block }: BookmarkBlockProps) {
  return <div>BookmarkBlock</div>;
}
