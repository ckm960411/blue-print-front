import EditButton from "@/components/work/components/form/EditButton";
import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import React, { useState } from "react";
import { format } from "date-fns";

import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { ColorKey, Colors } from "@/utils/common/color";
import { Memo } from "@/utils/types/memo";
import MemoCardButtons from "@/components/work/components/MemoCardButtons";

interface MemoCardProps {
  memo: Memo;
}
export default function MemoCard({ memo }: Readonly<MemoCardProps>) {
  const DEFAULT_COLOR: ColorKey = "yellow";
  const { id, milestoneId, color, title, content, createdAt } = memo;

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({
    memoId: id,
    milestoneId: milestoneId ?? undefined,
  });

  const theme: ColorKey = color ?? DEFAULT_COLOR;

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

  return (
    <div
      className="relative flex w-full flex-col gap-8px rounded-r-[10px] border-l-4 border-green-500 bg-green-50 p-16px"
      style={{
        borderColor: Colors[theme][500],
        backgroundColor: Colors[theme][50],
      }}
    >
      <div className="flex-between">
        <div className="flex-center gap-8px">
          {isEditing ? (
            <input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder="할일 제목을 설정해주세요"
              className="max-w-[300px] grow rounded-md border border-gray-200 px-12px py-6px text-16px font-semibold text-gray-700"
            />
          ) : (
            <p className="truncate-1-lines text-16px font-bold text-gray-800">
              {title}
            </p>
          )}
          <EditButton
            onClick={handleEdit}
            w={24}
            className="bg-transparent text-14px"
            tooltipPlacement="right"
          />
        </div>
        <MemoCardButtons
          memo={memo}
          milestoneId={memo.milestoneId ?? undefined}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="break-all text-14px leading-[150%] text-gray-700"
      />
      <p className="text-14px text-gray-600">
        {format(new Date(createdAt), "yyyy.MM.dd")} (
        {getDayByAsiaSeoulFormat(new Date(createdAt))})
      </p>
    </div>
  );
}
