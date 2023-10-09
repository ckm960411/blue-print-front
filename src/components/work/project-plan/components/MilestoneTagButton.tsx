import React from "react";
import { Colors } from "@/utils/common/color";

interface MilestoneTagButtonProps {
  name: string;
  color?: string;
  onClick?: () => void;
}
export default function MilestoneTagButton({
  name,
  color = Colors.gray[50],
  onClick,
}: MilestoneTagButtonProps) {
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
