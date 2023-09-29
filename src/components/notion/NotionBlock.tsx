import { Block } from "@/utils/types/notion";
import React from "react";

interface NotionBlockProps {
  block: Block;
}
export default function NotionBlock({ block }: NotionBlockProps) {
  return <div>NotionBlock</div>;
}
