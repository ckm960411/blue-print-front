import React from "react";
import { useRecoilValue } from "recoil";
import { useBoolean } from "usehooks-ts";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/work/milestone/useUpdateMilestoneMutation";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/work/task/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { MilestoneOrTask, Priority } from "@/utils/types";

import PriorityButton from "@/components/work/components/form/PriorityButton";

interface PriorityFormProps {
  parentType: MilestoneOrTask;
  parentId: number;
  priority: Priority;
}
export default function PriorityForm({
  parentType,
  parentId,
  priority,
}: Readonly<PriorityFormProps>) {
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);
  const {
    value: editing,
    setTrue: onEdit,
    setFalse: onStopEditing,
  } = useBoolean(false);

  const PRIORITIES: Priority[] = [1, 2, 3, 4, 5];

  const onError = (e: any) => {
    openToast({
      status: "error",
      title: "문제 발생",
      description:
        e?.response?.data?.message || "우선순위 수정 중 문제가 발생했습니다.",
    });
    onStopEditing();
  };

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    milestoneId: parentId,
    onSuccess: onStopEditing,
    onError,
  });

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    parentId,
    { onSuccess: onStopEditing, onError },
  );

  const handleClick = (priority: Priority) => {
    switch (parentType) {
      case "milestone":
        updateMilestoneRequest({ priority, projectId: project?.id });
        break;
      case "task":
        updateTaskRequest({
          taskId: parentId,
          priority,
          projectId: project?.id,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-14px items-center gap-8px">
      <p
        className={`truncate-1-lines text-14px font-medium text-gray-600 ${
          parentType === "milestone" ? "basis-[20%]" : "w-80px"
        }`}
      >
        우선순위
      </p>
      <Popover
        isOpen={editing}
        onClose={onStopEditing}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <div>
            <PriorityButton onClick={onEdit} priority={priority} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-200px">
          <div className="flex flex-wrap items-center gap-8px p-16px">
            {PRIORITIES.map((priority) => (
              <PriorityButton
                key={priority}
                onClick={handleClick}
                priority={priority}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
