import Unicode from "@/components/components/Unicode";
import PriorityButton from "@/components/work/components/PriorityButton";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Priority } from "@/utils/types";
import { Task } from "@/utils/types/task";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";

interface TaskPriorityFormProps {
  task: Task;
}
export default function TaskPriorityForm({ task }: TaskPriorityFormProps) {
  const { id, priority } = task;
  const toast = useRef<Toast>(null);

  const project = useRecoilValue(projectState);
  const [editing, setEditing] = useState(false);

  const PRIORITIES: Priority[] = [1, 2, 3, 4, 5];

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(id, {
    onSuccess: handleClose,
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "문제 발생",
        detail: "우선순위 수정 중 문제가 발생했습니다.",
      });
      handleClose();
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          우선순위
        </p>
        <Popover
          isOpen={editing}
          onClose={handleClose}
          placement="bottom-start"
        >
          <PopoverTrigger>
            <div>
              <PriorityButton onClick={handleOpen} priority={priority} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-200px">
            <div className="flex flex-wrap items-center gap-8px p-16px">
              {PRIORITIES.map((priority) => (
                <PriorityButton
                  key={priority}
                  onClick={() =>
                    updateTaskRequest({ priority, projectId: project?.id })
                  }
                  priority={priority}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
