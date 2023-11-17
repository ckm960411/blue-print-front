import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { Priority } from "@/utils/types";
import { Milestone } from "@/utils/types/milestone";
import PriorityButton from "@/components/work/components/PriorityButton";

interface MilestonePriorityFormProps {
  milestone: Milestone;
}
export default function MilestonePriorityForm({
  milestone,
}: MilestonePriorityFormProps) {
  const { id, priority } = milestone;
  const { openToast } = useToastMessage();

  const project = useRecoilValue(projectState);
  const [editing, setEditing] = useState(false);

  const PRIORITIES: Priority[] = [1, 2, 3, 4, 5];

  const handleOpen = () => setEditing(true);
  const handleClose = () => setEditing(false);

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(id, {
    onSuccess: handleClose,
    onError: () => {
      openToast({
        status: "error",
        title: "문제 발생",
        description: "우선순위 수정 중 문제가 발생했습니다.",
      });
      handleClose();
    },
  });

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines basis-[20%] text-14px font-medium text-gray-600">
        우선순위
      </p>
      <Popover isOpen={editing} onClose={handleClose} placement="bottom-start">
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
                  updateMilestoneRequest({ priority, projectId: project?.id })
                }
                priority={priority}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
