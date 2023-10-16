import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface CreateButtonProps {
  onClick?: () => void;
}
export default function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-center gap-4px rounded-md p-4px text-14px font-medium text-gray-600 duration-200 hover:bg-gray-50"
    >
      <AiOutlinePlus />
      <span>추가하기</span>
    </button>
  );
}
