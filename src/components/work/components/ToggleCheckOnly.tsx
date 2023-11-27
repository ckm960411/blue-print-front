import React from "react";
import { FaCheck } from "react-icons/fa6";

interface ToggleCheckOnlyProps {
  checked: boolean;
  onClick?: () => void;
}
export default function ToggleCheckOnly({
  checked,
  onClick,
}: Readonly<ToggleCheckOnlyProps>) {
  return (
    <button
      onClick={onClick}
      className={`flex-center gap-4px rounded-md p-4px text-12px font-medium duration-200 hover:bg-gray-50 ${
        checked ? "text-green-600" : "text-gray-600"
      }`}
    >
      <FaCheck />
      <span>{checked ? "모두 보기" : "체크된 것만 보기"}</span>
    </button>
  );
}
