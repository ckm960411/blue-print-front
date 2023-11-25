import { Colors } from "@/utils/common/color";
import React from "react";

interface TagButtonProps {
  name: string;
  color?: string;
  onClick?: () => void;
}
export default function TagButton({
  name,
  color = Colors.gray[50],
  onClick,
}: TagButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4px rounded-md px-8px py-4px text-14px font-medium ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ backgroundColor: color }}
    >
      {name}
    </button>
  );
}
