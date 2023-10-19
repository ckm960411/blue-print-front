import CreateTaskButton from "@/components/work/project-plan/CreateTaskButton";
import React from "react";

interface TaskListTabHeaderProps {}
export default function TaskListTabHeader({}: TaskListTabHeaderProps) {
  return (
    <div className="flex-between">
      <p className="text-22px font-bold">Task List</p>
      <CreateTaskButton />
    </div>
  );
}
