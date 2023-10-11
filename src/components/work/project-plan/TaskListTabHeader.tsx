import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface TaskListTabHeaderProps {}
export default function TaskListTabHeader({}: TaskListTabHeaderProps) {
  return (
    <div className="flex-between">
      <p className="text-22px font-bold">Task List</p>
      <button className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50">
        <AiOutlinePlus />
        추가하기
      </button>
    </div>
  );
}
