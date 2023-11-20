import { WorkTab } from "@/app/work/page";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createMilestone } from "@/utils/services/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface WorkTabMenuPlusButtonProps {
  workTab: WorkTab;
}
export default function WorkTabMenuPlusButton({
  workTab,
}: Readonly<WorkTabMenuPlusButtonProps>) {
  const queryClient = useQueryClient();
  const project = useRecoilValue(projectState);
  const {
    isOpen: isOpenTaskPopup,
    onOpen: openTaskPopup,
    onClose: closeTaskPopup,
  } = useDisclosure();

  const { mutate: createMilestoneRequest } = useMutation(
    ["create-milestone"],
    (projectId?: number) => createMilestone(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllMilestones());
      },
      onError: console.error,
    },
  );

  const handleClick = () => {
    if (!project) return;

    if (workTab === WorkTab.Milestone) {
      createMilestoneRequest(project.id);
    }

    if (workTab === WorkTab.Task) {
      openTaskPopup();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex-center gap-4px rounded-md bg-gray-50 px-8px py-4px text-14px font-semibold duration-200 hover:bg-gray-100"
      >
        <FaPlus />
        <span>추가하기</span>
      </button>

      <CreateUpdateTaskModal
        isOpen={isOpenTaskPopup}
        onClose={closeTaskPopup}
      />
    </>
  );
}
