import { createTask } from "@/utils/services/task";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const MilestoneMemoEditor = dynamic(
  () => import("../project-plan/sidetab/MilestoneMemoEditor"),
);

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateTaskModal({
  isOpen,
  onClose,
}: CreateTaskModalProps) {
  const toast = useRef<Toast>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createTaskRequest } = useMutation(
    ["create-task"],
    () => createTask({ title, description, content }),
    {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "할일 작성 완료",
          detail: "할일이 추가되었습니다.",
        });
        onClose();
      },
      onError: (e) => {
        const error = e as AxiosError<{ message: string[] }>;
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail:
            error?.response?.data?.message?.join?.(". ") ??
            "할일 추가 중 문제가 발생했습니다. 다시 시도해주세요.",
        });
        onClose();
      },
    },
  );

  return (
    <>
      <Toast ref={toast} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>태스크 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-16px">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할일의 제목을 입력하세요"
              className="w-full rounded-md border border-gray-200 px-16px py-12px text-16px focus:bg-blue-50"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="할일의 간단한 설명을 입력하세요"
              className="w-full rounded-md border border-gray-200 px-16px py-12px text-16px focus:bg-blue-50"
            />
            <MilestoneMemoEditor onChange={(v) => setContent(v)} />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center gap-8px">
              <button
                onClick={onClose}
                className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={() => createTaskRequest()}
                className="rounded-md bg-blue-500 px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
              >
                생성
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
