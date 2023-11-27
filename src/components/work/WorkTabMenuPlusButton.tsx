import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaPlus } from "react-icons/fa6";

import { milestoneKeys, QueryKeys } from "@/utils/common/query-keys";
import { useCreateMemoMutation } from "@/utils/hooks/react-query/work/memo/useCreateMemoMutation";
import { projectState } from "@/utils/recoil/store";
import { createMilestone } from "@/utils/services/milestone";

import { WorkTab } from "@/app/work/page";
import CreateUpdateTaskModal from "@/components/work/components/CreateUpdateTaskModal";

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
        queryClient.invalidateQueries(milestoneKeys.list(project?.id));
        queryClient.invalidateQueries(QueryKeys.getWorkCount(project?.id));
      },
      onError: console.error,
    },
  );

  const { mutate: createMemoRequest } = useCreateMemoMutation();

  const handleClick = () => {
    if (!project) return;

    if (workTab === WorkTab.Milestone) {
      createMilestoneRequest(project.id);
    }

    if (workTab === WorkTab.Task) {
      openTaskPopup();
    }

    if (workTab === WorkTab.Memo) {
      createMemoRequest({
        title: "메모 제목",
        content: "메모 내용",
        color: "yellow",
        projectId: project.id,
      });
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
