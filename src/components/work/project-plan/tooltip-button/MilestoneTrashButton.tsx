import { projectState } from "@/utils/recoil/store";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { BsTrash } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { milestoneKeys, QueryKeys, taskKeys } from "@/utils/common/query-keys";
import { deleteMilestone } from "@/utils/services/milestone";
import { Milestone } from "@/utils/types/milestone";
import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";
import { useRecoilValue } from "recoil";

interface MilestoneTrashButtonProps {
  milestone: Milestone;
}
export default function MilestoneTrashButton({
  milestone,
}: Readonly<MilestoneTrashButtonProps>) {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();

  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: deleteMilestoneRequest } = useMutation(
    ["delete-milestone"],
    (id: number) => deleteMilestone(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
        queryClient.invalidateQueries(
          taskKeys.list({ projectId: project?.id }),
        );
        queryClient.invalidateQueries(QueryKeys.getAllMemos());
      },
      onError: console.error,
    },
  );

  const handleDelete = () => {
    closeDeletePopup();
    deleteMilestoneRequest(milestone.id);
  };

  return (
    <Tooltip
      label="휴지통"
      className="rounded-md bg-gray-100 px-8px py-6px text-12px text-gray-600"
    >
      <span className="relative">
        <IconButton onClick={openDeletePopup}>
          <BsTrash />
        </IconButton>

        <DeletePopup
          open={isDeletePopupOpen}
          title="정말 이 마일스톤을 삭제할까요?"
          onClose={closeDeletePopup}
          onComplete={handleDelete}
        />
      </span>
    </Tooltip>
  );
}
