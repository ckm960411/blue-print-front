import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import { Memo } from "@/utils/types/memo";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";

const PlainEditor = dynamic(() => import("../components/PlainEditor"));

interface MemoContentFormProps {
  memo: Memo;
}
export default function MemoContentForm({
  memo,
}: Readonly<MemoContentFormProps>) {
  const [content, setContent] = useState(memo.content ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: memo.id,
  });

  const type = memo.content ? "update" : "create";

  const handleOpen = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const handleConfirm = () => {
    updateMemoRequest({ content });
    handleClose();
  };

  return (
    <>
      <div className="flex-between">
        <div className="flex items-center gap-4px text-gray-600">
          <FaRegCalendar />
          <span className="text-14px">
            {format(new Date(memo.createdAt), "yyyy년 MM월 dd일 HH:mm")}
          </span>
        </div>
        <button
          onClick={handleOpen}
          className="rounded-md border border-gray-200 px-8px py-4px text-14px duration-200 hover:text-main hover:shadow-md"
        >
          수정하기
        </button>
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-16px">
          <PlainEditor
            type={type}
            placeholder="메모 내용을 입력하세요"
            value={content}
            onChange={(v) => setContent(v)}
          />
          <div className="flex items-center gap-8px">
            <button
              onClick={handleClose}
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
        </div>
      ) : (
        <div
          className="break-all text-16px leading-[150%] text-gray-700"
          dangerouslySetInnerHTML={{ __html: memo.content }}
        />
      )}
    </>
  );
}
