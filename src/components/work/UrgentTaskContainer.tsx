import TaskCard from "@/components/work/components/TaskCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllUrgenttTasks } from "@/utils/services/task";
import { useQuery } from "react-query";
import React from "react";

interface UrgentTaskContainerProps {
  milestoneId?: number;
}
export default function UrgentTaskContainer({
  milestoneId,
}: UrgentTaskContainerProps) {
  const { data: tasks = [] } = useQuery(
    QueryKeys.getAllTasks("urgent", milestoneId),
    () => getAllUrgenttTasks({ milestoneId }),
    { onError: console.error },
  );

  if (tasks.length === 0) return <></>;

  return (
    <div className="relative mt-16px flex flex-col gap-16px rounded-10px border border-red-200 px-16px pb-16px pt-32px">
      <p className="absolute -top-16px left-8px bg-white p-8px text-18px font-bold text-red-500">
        긴급한 태스크
      </p>
      <div className="flex flex-col gap-16px">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
