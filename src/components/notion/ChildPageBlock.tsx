import { Block } from "@/utils/types/notion";
import React from "react";

interface ChildPageBlockProps {
  block: Block;
}
export default function ChildPageBlock({ block }: ChildPageBlockProps) {
  return <div>ChildPageBlock</div>;
}
