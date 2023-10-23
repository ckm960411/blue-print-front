import { QueryKeys } from "@/utils/common/query-keys";
import { deleteMilestone } from "@/utils/services/milestone";
import { Milestone } from "@/utils/types/milestone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import IconButton from "@/components/components/IconButton";

interface MilestoneTrashButtonProps {
  milestone: Milestone;
}
export default function MilestoneTrashButton({
  milestone,
}: MilestoneTrashButtonProps) {
  const queryClient = useQueryClient();
  const [openPopup, setOpenPopup] = useState(false);

  const { mutate: deleteMilestoneRequest } = useMutation(
    ["delete-milestone"],
    (id: number) => deleteMilestone(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
      },
      onError: console.error,
    },
  );

  const handleDelete = () => {
    setOpenPopup(false);
    deleteMilestoneRequest(milestone.id);
  };

  return (
    <Tooltip
      label="휴지통"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span>
        <Popover isOpen={openPopup} placement="bottom-end">
          <PopoverTrigger>
            <IconButton onClick={() => setOpenPopup(true)}>
              <BsTrash />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent className="max-w-[240px] p-16px text-14px font-medium text-gray-800">
            <div>정말 이 메모를 삭제할까요?</div>
            <div className="mt-16px flex items-center justify-end gap-8px">
              <button
                onClick={() => setOpenPopup(false)}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                확인
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </Tooltip>
  );
}
