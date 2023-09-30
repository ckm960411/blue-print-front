"use client";

import { Block } from "@/utils/types/notion";
import React from "react";
import Caption from "./Caption";

interface BookmarkBlockProps {
  block: Block;
}
export default function BookmarkBlock({ block }: BookmarkBlockProps) {
  const {
    bookmark: { caption, url },
  } = block;

  return (
    <div>
      <div>BookmarkBlock</div>
      <Caption caption={caption} />
    </div>
  );
}
