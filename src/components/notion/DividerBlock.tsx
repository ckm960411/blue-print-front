import { Block } from "@/utils/types/notion";
import React from "react";

interface DividerBlockProps {
  block: Block;
}
export default function DividerBlock({ block }: DividerBlockProps) {
  return <div>DividerBlock</div>;
}
