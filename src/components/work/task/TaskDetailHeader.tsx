import TaskTags from "@/components/work/components/task-card/TaskTags";
import { Task } from "@/utils/types/task";
import React from "react";

interface TaskDetailHeaderProps {
  task: Task;
  milestoneTitle: string | null;
}
export default function TaskDetailHeader({
  task,
  milestoneTitle,
}: Readonly<TaskDetailHeaderProps>) {
  return (
    <div className="flex flex-col gap-16px p-24px">
      {milestoneTitle && (
        <p className="truncate-1-lines text-16px font-semibold text-gray-800">
          {milestoneTitle}
        </p>
      )}
      <p className="truncate-2-lines text-22px font-bold leading-[140%]">
        {task.title}
      </p>
      {task.description && (
        <p className="text-16px leading-[150%] text-gray-600">
          {task.description}
        </p>
      )}
      <TaskTags task={task} />
    </div>
  );
}