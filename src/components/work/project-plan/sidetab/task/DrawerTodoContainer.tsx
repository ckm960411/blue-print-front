import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiFlag } from "react-icons/bi";
import { IoHammerOutline } from "react-icons/io5";
import DrawerTodoGroup from "@/components/work/project-plan/sidetab/task/DrawerTodoGroup";

interface DrawerTodoContainerProps {}
export default function DrawerTodoContainer({}: DrawerTodoContainerProps) {
  return (
    <div className="mt-16px flex flex-col gap-24px">
      <DrawerTodoGroup
        groupName="TO DO"
        icon={<AiOutlineUnorderedList />}
        theme="bg-teal-500"
      />
      <DrawerTodoGroup
        groupName="IN PROGRESS"
        icon={<IoHammerOutline />}
        theme="bg-purple-500"
      />
      <DrawerTodoGroup groupName="DONE" icon={<BiFlag />} theme="bg-blue-500" />
    </div>
  );
}
