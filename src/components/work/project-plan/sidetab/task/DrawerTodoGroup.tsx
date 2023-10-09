import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import DrawerTodoCard from "@/components/work/project-plan/sidetab/task/DrawerTodoCard";

interface DrawerTodoGroupProps {
  groupName: "TO DO" | "IN PROGRESS" | "DONE";
  icon: React.ReactNode;
  theme?: "bg-teal-500" | "bg-purple-500" | "bg-blue-500";
}
export default function DrawerTodoGroup({
  groupName,
  icon,
  theme = "bg-teal-500",
}: DrawerTodoGroupProps) {
  return (
    <div className="flex gap-16px">
      <div className="flex flex-shrink-0 flex-col items-center gap-16px">
        <div
          className={`flex-center h-24px w-24px flex-shrink-0 rounded-full text-white ${theme}`}
        >
          {icon}
        </div>
        <div className={`w-2px grow ${theme}`} />
      </div>
      <div className="flex grow flex-col gap-16px">
        <p className="text-24px font-bold">{groupName}</p>
        <DrawerTodoCard
          checked={true}
          title="할일 이름"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
        <DrawerTodoCard
          checked={true}
          title="할일 이름"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        />
      </div>
    </div>
  );
}
