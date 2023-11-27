import React from "react";
import { format } from "date-fns";
import { FaRegCalendar, FaRegStickyNote } from "react-icons/fa";

import { Colors } from "@/utils/common/color";
import { useMemoByIdQuery } from "@/utils/hooks/react-query/work/memo/useMemoByIdQuery";

import MemoCardButtons from "@/components/work/components/MemoCardButtons";
import ColorForm from "@/components/work/components/ColorForm";

interface MemoContentProps {
  currentMemoId: number | null;
}
export default function MemoContent({
  currentMemoId,
}: Readonly<MemoContentProps>) {
  const { data: memo } = useMemoByIdQuery(currentMemoId);

  if (!memo) {
    return (
      <div className="flex-center h-full flex-col gap-16px text-20px text-gray-600">
        <FaRegStickyNote />
        <p>메모가 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col gap-16px p-16px"
      style={{ backgroundColor: Colors[memo.color][50] }}
    >
      <div className="flex-between">
        <div className="flex items-center gap-8px">
          <ColorForm initialColor={memo.color} onConfirm={() => {}} />
          <p className="text-22px font-bold leading-[150%]">{memo.title}</p>
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
