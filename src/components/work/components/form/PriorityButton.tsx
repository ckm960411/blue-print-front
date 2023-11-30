import Unicode from "@/components/components/Unicode";
import { Priority } from "@/utils/types";
import React from "react";

interface PriorityButtonProps {
  priority: Priority;
  onClick?: (priority: Priority) => void;
}
export default function PriorityButton({
  priority,
  onClick,
}: Readonly<PriorityButtonProps>) {
  return (
    <button
      onClick={() => onClick?.(priority)}
      className="flex items-center gap-4px rounded-md bg-purple-50 px-8px py-4px text-14px font-medium"
    >
      {Array.from({ length: priority }).map((_, i) => (
        <Unicode key={i} value="2b50" className="text-12px" />
      ))}
    </button>
  );
}
