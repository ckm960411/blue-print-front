import TaskCard from "@/components/work/project-plan/sidetab/task/TaskCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllTask } from "@/utils/services/task";
import { Progress } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

interface DrawerTodoContainerProps {}
export default function DrawerTodoContainer({}: DrawerTodoContainerProps) {
  const toast = useRef<Toast>(null);
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

  const { data: tasks } = useQuery(
    QueryKeys.getAllTasks(progress),
    () => getAllTask({ progress }),
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
              className={`border-b-[3px] py-4px ${tab.borderColor} ${
                progress === tab.id
                  ? "font-semibold text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-16px">
          {tasks?.map((task) => <TaskCard key={task.id} />)}
        </div>
      </div>
    </>
  );
}
