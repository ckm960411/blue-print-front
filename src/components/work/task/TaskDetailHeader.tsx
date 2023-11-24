import TaskTags from "@/components/work/components/task-card/TaskTags";
import TaskDescriptionForm from "@/components/work/task/TaskDescriptionForm";
import TaskTitleForm from "@/components/work/task/TaskTitleForm";
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
      <TaskTitleForm task={task} />
      <TaskDescriptionForm task={task} />
      <TaskTags task={task} />
    </div>
  );
}
