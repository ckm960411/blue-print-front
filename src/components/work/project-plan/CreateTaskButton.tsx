import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface CreateTaskButtonProps {}
export default function CreateTaskButton({}: CreateTaskButtonProps) {
  return (
    <button className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50">
      <AiOutlinePlus />
      추가하기
    </button>
  );
}
