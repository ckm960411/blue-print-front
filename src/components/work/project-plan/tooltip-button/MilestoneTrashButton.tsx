import React, { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useOnClickOutside } from "usehooks-ts";
import { Tooltip } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/utils/common/query-keys";
import { deleteMilestone } from "@/utils/services/milestone";
import { Milestone } from "@/utils/types/milestone";
import IconButton from "@/components/components/IconButton";

interface MilestoneTrashButtonProps {
  milestone: Milestone;
}
export default function MilestoneTrashButton({
  milestone,
}: MilestoneTrashButtonProps) {
  const deletePopupRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const [openPopup, setOpenPopup] = useState(false);

  useOnClickOutside(deletePopupRef, () => setOpenPopup(false));

  const { mutate: deleteMilestoneRequest } = useMutation(
    ["delete-milestone"],
    (id: number) => deleteMilestone(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
        queryClient.invalidateQueries(QueryKeys.getAllMemos());
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
      <span className="relative">
        <IconButton onClick={() => setOpenPopup(true)}>
          <BsTrash />
        </IconButton>

        {openPopup && (
          <div
            ref={deletePopupRef}
            className="absolute right-0 top-full w-240px rounded-10px bg-white p-16px text-14px font-medium text-gray-800 shadow-lg"
          >
            <div>정말 이 마일스톤을 삭제할까요?</div>
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
          </div>
        )}
      </span>
    </Tooltip>
  );
}
