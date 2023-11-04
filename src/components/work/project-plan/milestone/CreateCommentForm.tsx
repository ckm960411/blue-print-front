import CreateButton from "@/components/work/components/CreateButton";
import ToggleCheckOnly from "@/components/work/components/ToggleCheckOnly";
import { QueryKeys } from "@/utils/common/query-keys";
import { createComment } from "@/utils/services/comment";
import { CreateCommentReqDto } from "@/utils/services/comment/dto/create-comment.req.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const PlainEditor = dynamic(() => import("../../components/PlainEditor"));

interface CreateCommentFormProps {
  milestoneId: number;
  showChecked: boolean;
  onToggleCheck: () => void;
}
export default function CreateCommentForm({
  milestoneId,
  showChecked,
  onToggleCheck,
}: Readonly<CreateCommentFormProps>) {
  const toast = useRef<Toast | null>(null);
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");

  const { mutate: createCommentRequest } = useMutation(
    ["create-comment"],
    (createCommentReqDto: CreateCommentReqDto) =>
      createComment(createCommentReqDto),
    {
      onSuccess: () => {
        setShowForm(false);
        toast.current?.show({
          severity: "success",
          summary: "댓글 작성 완료",
          detail: "댓글 작성이 완료됐습니다.",
        });
        queryClient.invalidateQueries(QueryKeys.getAllComments());
      },
      onError: console.error,
    },
  );

  const handleConfirm = () => {
    if (!content.trim()) return;

    createCommentRequest({ content, milestoneId });
  };

  const handleCancel = () => {
    setShowForm(false);
    setContent("");
  };

  return (
    <div className="flex flex-col gap-8px">
      <Toast ref={toast} />
      {showForm ? (
        <>
          <PlainEditor
            placeholder="댓글을 입력하세요"
            onChange={(value) => setContent(value)}
            height="80px"
          />
          <div className="flex items-center justify-end gap-8px">
            <button
              onClick={handleCancel}
              className="rounded-md px-10px py-6px text-14px duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md px-10px py-6px text-14px duration-200 hover:bg-gray-100"
            >
              확인
            </button>
          </div>
        </>
      ) : (
        <div className="flex-between">
          <ToggleCheckOnly checked={showChecked} onClick={onToggleCheck} />
          <CreateButton onClick={() => setShowForm(true)} />
        </div>
      )}
    </div>
  );
}
