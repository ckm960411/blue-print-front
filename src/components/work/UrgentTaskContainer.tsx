import TaskCard from "@/components/work/components/TaskCard";
import { taskKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getAllUrgenttTasks } from "@/utils/services/task";
import { useQuery } from "react-query";
import React from "react";
import { useRecoilValue } from "recoil";

interface UrgentTaskContainerProps {
  milestoneId?: number;
}
export default function UrgentTaskContainer({
  milestoneId,
}: UrgentTaskContainerProps) {
  const project = useRecoilValue(projectState);

  const { data: tasks = [] } = useQuery(
    taskKeys.urgent({ projectId: project?.id, milestoneId: milestoneId }),
    () => {
      if (!project) return Promise.reject("no project");
      return getAllUrgenttTasks({ milestoneId });
    },
    { enabled: !!project, onError: console.error },
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
