import MilestoneEditButton from "@/components/work/project-plan/tooltip-button/MilestoneEditButton";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Task } from "@/utils/types/task";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface TaskDescriptionFormProps {
  task: Task;
}
export default function TaskDescriptionForm({
  task,
}: TaskDescriptionFormProps) {
  const project = useRecoilValue(projectState);

  const [tempDescription, setTempDescription] = useState(
    () => task.description ?? "",
  );
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation();

  const resetDescription = () => setTempDescription(task.description ?? "");

  const handleEdit = () => {
    if (isEditing) {
      updateTaskRequest({
        taskId: task.id,
        description: tempDescription,
        projectId: project?.id,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    resetDescription();
  };

  if (!task.description) return <></>;

  return (
    <div className="flex items-start gap-8px">
      {isEditing ? (
        <input
          value={tempDescription}
          onChange={(e) => setTempDescription(e.target.value)}
          placeholder="할일의 간단한 설명을 설정해주세요"
          className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
        />
      ) : (
        <p className="text-16px leading-[150%] text-gray-600">
          {task.description}
        </p>
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
