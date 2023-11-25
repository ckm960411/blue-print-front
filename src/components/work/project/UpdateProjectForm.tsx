"use client";

import EditButton from "@/components/work/components/form/EditButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { updateProject } from "@/utils/services/project";
import { CreateProjectReqDto } from "@/utils/services/project/dto/create-project.req.dto";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

interface UpdateProjectFormProps {}
export default function UpdateProjectForm({}: UpdateProjectFormProps) {
  const [project, setProject] = useRecoilState(projectState);
  const [title, setTitle] = useState(() => project?.title ?? "");
  const [description, setDescription] = useState(
    () => project?.description ?? "",
  );

  const {
    isOpen: isOpenUpdateModal,
    onOpen: openUpdateModal,
    onClose: closeUpdateModal,
  } = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate: updateProjectRequest } = useMutation(
    ["update-project"],
    (updateProjectReqDto: Partial<CreateProjectReqDto>) =>
      updateProject(project?.id!, updateProjectReqDto),
    {
      onSuccess: (prj) => {
        queryClient.invalidateQueries(QueryKeys.getAllProjects());
        setProject(prj);
      },
      onError: console.error,
    },
  );

  const handleUpdate = () => {
    if (!project) return;

    updateProjectRequest({ title, description });

    closeUpdateModal();
  };

  if (!project) return <></>;

  return (
    <>
      <EditButton
        onClick={openUpdateModal}
        w={24}
        className="text-14px"
        tooltipPlacement="right"
      />

      <Modal
        isOpen={isOpenUpdateModal}
        onClose={closeUpdateModal}
        size="xl"
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>프로젝트 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-16px">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="프로젝트 이름을 입력하세요"
              className="w-full rounded-md border border-gray-200 px-16px py-12px text-16px focus:bg-blue-50"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="프로젝트의 간단한 설명을 입력하세요"
              className="w-full rounded-md border border-gray-200 px-16px py-12px text-16px focus:bg-blue-50"
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center gap-8px">
              <button
                onClick={closeUpdateModal}
                className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleUpdate}
                className="rounded-md bg-blue-500 px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
              >
                수정
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
