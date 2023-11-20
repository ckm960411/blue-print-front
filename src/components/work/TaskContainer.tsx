import TaskTabContent from "@/components/work/task/TaskTabContent";
import React from "react";

interface TaskContainerProps {
  milestoneId?: number;
}
export default function TaskContainer({
  milestoneId,
}: Readonly<TaskContainerProps>) {
  return (
    <div className="mt-16px flex flex-col gap-16px">
      <TaskTabContent milestoneId={milestoneId} />
    </div>
  );
}
