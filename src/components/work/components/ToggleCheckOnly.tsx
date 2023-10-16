import React from "react";
import { BsCheckLg } from "react-icons/bs";

interface ToggleCheckOnlyProps {
  checked: boolean;
  onClick?: () => void;
}
export default function ToggleCheckOnly({
  checked,
  onClick,
}: ToggleCheckOnlyProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-center gap-4px rounded-md p-4px text-14px font-medium duration-200 hover:bg-gray-50 ${
        checked ? "text-green-600" : "text-gray-600"
      }`}
    >
      <BsCheckLg />
      <span>{checked ? "모두 보기" : "체크된 것만 보기"}</span>
    </button>
  );
}
