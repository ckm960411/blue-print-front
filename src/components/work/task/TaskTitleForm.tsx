import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Task } from "@/utils/types/task";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface TaskTitleFormProps {
  task: Task;
}
export default function TaskTitleForm({ task }: TaskTitleFormProps) {
  const project = useRecoilValue(projectState);

  const [tempTitle, setTempTitle] = useState(() => task.title ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation();

  const resetTitle = () => setTempTitle(task.title ?? "");

  const handleEdit = () => {
    if (isEditing) {
      updateTaskRequest({
        taskId: task.id,
        title: tempTitle,
        projectId: project?.id,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    resetTitle();
  };

  return (
    <div className="mt-8px flex items-start gap-8px">
      {isEditing ? (
        <input
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          placeholder="할일 제목을 설정해주세요"
          className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
        />
      ) : (
        <p className="text-24px font-bold">{task.title}</p>
      )}
      <MilestoneEditButton
        onClick={handleEdit}
        w={24}
        className="text-14px"
        tooltipPlacement="right"
      />
    </div>
  );
}
