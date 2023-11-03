import { QueryKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { createTask, updateTask } from "@/utils/services/task";
import { UpdateTaskReqDto } from "@/utils/services/task/dto/update-task.req.dto";
import { Task } from "@/utils/types/task";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const PlainEditor = dynamic(() => import("../components/PlainEditor"));

interface CreateUpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  type?: "create" | "update";
  milestoneId?: number;
}
export default function CreateUpdateTaskModal({
  isOpen,
  onClose,
  task,
  type = "create",
  milestoneId,
}: CreateUpdateTaskModalProps) {
  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();

  const project = useRecoilValue(projectState);
  const [title, setTitle] = useState(() => task?.title ?? "");
  const [description, setDescription] = useState(() => task?.description ?? "");
  const [content, setContent] = useState(() => task?.content ?? "");

  const onSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "할일 작성 완료",
      detail: "할일이 추가되었습니다.",
    });
    queryClient.invalidateQueries({ queryKey: QueryKeys.getAllTasks() });
    queryClient.invalidateQueries(QueryKeys.getAllMilestones());
    onClose();
    if (type === "create") {
      setTitle("");
      setDescription("");
    }
  };

  const onError = (e?: any) => {
    const error = e as AxiosError<{ message: string[] }>;
    toast.current?.show({
      severity: "error",
      summary: "문제 발생",
      detail:
        error?.response?.data?.message?.join?.(". ") ??
        `할일 ${
          type === "create" ? "추가" : "수정"
        } 중 문제가 발생했습니다. 다시 시도해주세요.`,
    });
    onClose();
  };

  const { mutate: createTaskRequest } = useMutation(
    ["create-task"],
    () =>
      createTask({
        title,
        description,
        content,
        milestoneId,
        projectId: project?.id,
      }),
    { onSuccess, onError },
  );

  const { mutate: updateTaskRequest } = useMutation(
    ["update-task"],
    (updateTaskReqDto: UpdateTaskReqDto) =>
      updateTask(task!.id, updateTaskReqDto),
    { onSuccess, onError },
  );

  const handleConfirm = () => {
    if (type === "create") {
      createTaskRequest();
    } else {
      // update
      if (!task) return onError();
      updateTaskRequest({
        title,
        description,
        content,
        milestoneId,
        projectId: project?.id,
      });
    }
  };

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
          <ModalHeader>
            태스크 {type === "create" ? "추가" : "수정"}
          </ModalHeader>
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
            <PlainEditor
              type={type}
              placeholder="메모를 입력하세요"
              value={content}
              onChange={(v) => setContent(v)}
            />
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
                onClick={handleConfirm}
                className="rounded-md bg-blue-500 px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
              >
                {type === "create" ? "생성" : "수정"}
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
