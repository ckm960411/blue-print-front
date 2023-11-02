import TaskCard from "@/components/work/components/TaskCard";
import { useTasksQuery } from "@/utils/hooks/react-query/useTasksQuery";
import { projectState } from "@/utils/recoil/store";
import { Progress } from "@/utils/types";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";

interface TaskContainerProps {
  milestoneId?: number;
}
export default function TaskContainer({ milestoneId }: TaskContainerProps) {
  const toast = useRef<Toast>(null);
  const UNDER_410PX = useMediaQuery({ query: "(max-width: 409px)" });
  const [progress, setProgress] = useState<Progress>(Progress.ToDo);

  const tabs = [
    { id: Progress.ToDo, title: "To Do", borderColor: "border-orange-400" },
    {
      id: Progress.InProgress,
      title: "In Progress",
      borderColor: "border-blue-400",
    },
    { id: Progress.Review, title: "Review", borderColor: "border-purple-400" },
    {
      id: Progress.Completed,
      title: "Completed",
      borderColor: "border-green-400",
    },
  ];

  const project = useRecoilValue(projectState);

  const { data: tasks } = useTasksQuery(
    { progress, milestoneId },
    {
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "할일 목록을 불러오던 중 문제가 발생했습니다.",
        });
      },
    },
  );
  return (
    <>
      <Toast ref={toast} />
      <div className="mt-16px flex flex-col gap-24px">
        <div className="grid grid-cols-4 gap-8px text-center text-gray-800">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setProgress(tab.id)}
              className={`border-b-[3px] py-8px ${tab.borderColor} ${
                progress === tab.id
                  ? "font-semibold text-gray-800"
                  : "text-gray-400"
              } ${UNDER_410PX ? "text-12px" : "text-16px"}`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-16px">
          {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </>
  );
}
