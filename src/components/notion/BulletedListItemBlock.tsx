import { Block } from "@/utils/types/notion";
import React from "react";

interface BulletedListItemBlockProps {
  block: Block;
}
export default function BulletedListItemBlock({
  block,
}: BulletedListItemBlockProps) {
  return <div>BulletedListItemBlock</div>;
}
