import EditButton from "@/components/work/components/form/EditButton";
import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import React, { useState } from "react";
import { format } from "date-fns";
import { FaRegCalendar, FaRegStickyNote } from "react-icons/fa";

import { ColorKey, Colors } from "@/utils/common/color";
import { useMemoByIdQuery } from "@/utils/hooks/react-query/work/memo/useMemoByIdQuery";

import MemoCardButtons from "@/components/work/components/MemoCardButtons";
import ColorForm from "@/components/work/components/ColorForm";

interface MemoContentProps {
  currentMemoId: number | null;
}
export default function MemoContent({
  currentMemoId,
}: Readonly<MemoContentProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  const { data: memo } = useMemoByIdQuery(currentMemoId);
  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: memo?.id,
  });

  if (!memo) {
    return (
      <div className="flex-center h-full flex-col gap-16px text-20px text-gray-600">
        <FaRegStickyNote />
        <p>메모가 없습니다.</p>
      </div>
    );
  }

  const resetTitle = () => setTempTitle(memo.title ?? "");

  const handleEdit = () => {
    if (isEditing) {
      updateMemoRequest({ title: tempTitle });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    resetTitle();
  };

  const handleUpdateColor = (color: ColorKey) => {
    updateMemoRequest({ color });
  };

  return (
    <div
      className="flex h-full flex-col gap-16px p-16px"
      style={{ backgroundColor: Colors[memo.color][50] }}
    >
      <div className="flex-between">
        <div className="flex items-center gap-8px">
          <ColorForm initialColor={memo.color} onConfirm={handleUpdateColor} />
          <div className="flex-center gap-8px">
            {isEditing ? (
              <input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="할일 제목을 설정해주세요"
                className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
              />
            ) : (
              <p className="text-22px font-bold leading-[150%]">{memo.title}</p>
            )}
            <EditButton
              onClick={handleEdit}
              w={24}
              className="bg-transparent text-14px"
              tooltipPlacement="right"
            />
          </div>
        </div>
        <MemoCardButtons memo={memo} />
      </div>
      <div className="flex items-center gap-4px text-gray-600">
        <FaRegCalendar />
        <span className="text-14px">
          {format(new Date(memo.createdAt), "yyyy년 MM월 dd일 HH:mm")}
        </span>
      </div>
      <div
        className="break-all text-16px leading-[150%] text-gray-700"
        dangerouslySetInnerHTML={{ __html: memo.content }}
      />
    </div>
  );
}
