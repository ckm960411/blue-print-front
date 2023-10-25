"use client";

import IconButton from "@/components/components/IconButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { deleteProject } from "@/utils/services/project";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { useRecoilState } from "recoil";

interface DeleteProjectButtonProps {}
export default function DeleteProjectButton({}: DeleteProjectButtonProps) {
  const queryClient = useQueryClient();
  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const [project, setProject] = useRecoilState(projectState);

  const { mutate: deleteProjectRequest } = useMutation(
    ["delete-project"],
    (id: number) => deleteProject(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
        setProject(undefined);
      },
      onError: console.error,
    },
  );

  const handleDelete = () => {
    if (!project) return;
    deleteProjectRequest(project.id);
    closeDeletePopup();
  };

  if (!project) return <></>;

  return (
    <Popover isOpen={isDeletePopupOpen} placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          onClick={openDeletePopup}
          className="rounded-md bg-transparent text-18px hover:bg-gray-100"
          w={24}
        >
          <BsTrash />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="max-w-[240px] p-16px text-14px font-medium text-gray-800">
        <div>정말 이 프로젝트를 삭제할까요?</div>
        <div className="mt-16px flex items-center justify-end gap-8px">
          <button
            onClick={closeDeletePopup}
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
  );
}
