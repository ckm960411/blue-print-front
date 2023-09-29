import { Block } from "@/utils/types/notion";
import React from "react";

interface CodeBlockProps {
  block: Block;
}
export default function CodeBlock({ block }: CodeBlockProps) {
  return <div>CodeBlock</div>;
}
