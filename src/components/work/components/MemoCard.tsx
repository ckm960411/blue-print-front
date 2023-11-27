import React from "react";
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
  const { color, title, content, createdAt } = memo;

  const theme: ColorKey = color ?? DEFAULT_COLOR;

  return (
    <div
      className="relative flex w-full flex-col gap-8px rounded-r-[10px] border-l-4 border-green-500 bg-green-50 p-16px"
      style={{
        borderColor: Colors[theme][500],
        backgroundColor: Colors[theme][50],
      }}
    >
      <div className="flex-between">
        <p className="truncate-1-lines text-16px font-bold text-gray-800">
          {title}
        </p>
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
