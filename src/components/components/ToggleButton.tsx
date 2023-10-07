import { TbTriangleInvertedFilled } from "react-icons/tb";
import React from "react";

interface ToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}
export default function ToggleButton({ open, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex-center h-24px w-24px duration-200 ${
        open ? "-rotate-180" : ""
      }`}
    >
      <TbTriangleInvertedFilled />
    </button>
  );
}
