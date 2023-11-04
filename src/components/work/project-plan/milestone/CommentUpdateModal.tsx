import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateCommentMutation } from "@/utils/hooks/react-query/useUpdateCommentMutation";
import { Comment } from "@/utils/types/comment";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const PlainEditor = dynamic(() => import("../../components/PlainEditor"));

interface CommentUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment;
}
export default function CommentUpdateModal({
  isOpen,
  onClose,
  comment,
}: CommentUpdateModalProps) {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();
  const [content, setContent] = useState(() => comment.content);

  const { mutate: updateCommentRequest } = useUpdateCommentMutation(
    comment.id,
    {
      onSuccess: () => {
        openToast({ title: "댓글 수정 완료" });
        queryClient.invalidateQueries({ queryKey: QueryKeys.getAllComments() });
        onClose();
      },
      onError: (e?: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ??
            "댓글 수정 중 문제가 발생했습니다. 다시 시도해주세요.",
        });
        onClose();
      },
    },
  );

  const handleConfirm = () => {
    updateCommentRequest({ content });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댓글 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-16px">
          <PlainEditor
            type="update"
            placeholder="댓글을 입력하세요"
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
              수정
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
