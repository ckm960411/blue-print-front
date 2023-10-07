import { TbTriangleInvertedFilled } from "react-icons/tb";
import React from "react";

interface ToggleButtonProps {
  open: boolean;
  onToggle: () => void;
  w?: number;
  h?: number;
}
export default function ToggleButton({
  open,
  onToggle,
  w,
  h,
}: ToggleButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`flex-center h-24px w-24px duration-200 ${
        open ? "-rotate-180" : ""
      }`}
      style={{ width: w ?? 24, height: h ?? w ?? 24 }}
    >
      <TbTriangleInvertedFilled />
    </button>
  );
}
