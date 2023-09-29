import { Block, BlockType } from "@/utils/types/notion";
import React from "react";
import RichText from "./RichText";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";

interface ToDoBlockProps {
  block: Block;
}
export default function ToDoBlock({ block }: ToDoBlockProps) {
  if (block.type !== BlockType.to_do) return <></>;

  const {
    to_do: { checked, rich_text },
  } = block;

  if (!rich_text || !checked) return <></>;

  return (
    <p className="flex gap-8px">
      <button className="h-20px w-20px flex-shrink-0">
        {checked ? (
          <BsCheckSquareFill className="text-20px text-main" />
        ) : (
          <BsCheckSquare className="text-20px text-main" />
        )}
      </button>
      <RichText richText={rich_text} />
    </p>
  );
}
