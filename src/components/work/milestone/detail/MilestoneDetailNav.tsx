import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";
import DropdownMenu from "@/components/work/components/task-card/DropdownMenu";
import MilestoneColorForm from "@/components/work/project-plan/MilestoneColorForm";

import { milestoneKeys } from "@/utils/common/query-keys";
import { useUpdateMilestoneMutation } from "@/utils/hooks/react-query/useUpdateMilestoneMutation";
import { projectState } from "@/utils/recoil/store";
import { deleteMilestone } from "@/utils/services/milestone";
import { Milestone } from "@/utils/types/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill, BsTrash } from "react-icons/bs";
import { GrExpand } from "react-icons/gr";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { useBoolean } from "usehooks-ts";

interface MilestoneDetailNavProps {
  milestone: Milestone;
}
export default function MilestoneDetailNav({
  milestone,
}: Readonly<MilestoneDetailNavProps>) {
  const project = useRecoilValue(projectState);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: updateMilestoneRequest } = useUpdateMilestoneMutation(
    milestone.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
      },
      onError: console.error,
    },
  );

  const { mutate: deleteMilestoneRequest } = useMutation(
    ["delete-milestone"],
    (id: number) => deleteMilestone(id),
    {
      onSuccess: (deletedMilestone) => {
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
        queryClient.removeQueries(
          milestoneKeys.detail(milestone.id, project?.id),
        );
      },
      onError: console.error,
    },
  );

  const handleDelete = () => {
    closeDeletePopup();
    deleteMilestoneRequest(milestone.id);
  };

  const menus = [
    { title: "삭제하기", icon: <BsTrash />, onClick: openDeletePopup },
  ];

  return (
    <div className="flex h-32px items-center justify-between px-16px">
      <IconButton
        w={24}
        onClick={() => router.push(`/work/milestone/${milestone.id}`)}
      >
        <GrExpand className="text-12px" />
      </IconButton>
      <div className="flex-center gap-4px">
        <MilestoneColorForm milestone={milestone} />
        <IconButton
          w={24}
          onClick={() =>
            updateMilestoneRequest({ isBookmarked: !milestone.isBookmarked })
          }
        >
          {milestone.isBookmarked ? (
            <BsFillBookmarkFill className="text-14px text-red-500" />
          ) : (
            <BsBookmark className="text-14px" />
          )}
        </IconButton>
        <div className="relative">
          <IconButton w={24} onClick={openDropdown}>
            <BiDotsVerticalRounded className="text-18px" />
          </IconButton>
          <DropdownMenu
            open={dropdownOpened}
            menus={menus}
            onClose={closeDropdown}
          />

          <DeletePopup
            open={isDeletePopupOpen}
            title="정말 이 마일스톤을 삭제할까요?"
            onClose={closeDeletePopup}
            onComplete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
