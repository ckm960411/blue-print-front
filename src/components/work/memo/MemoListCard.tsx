import { ColorKey, Colors } from "@/utils/common/color";
import React from "react";
import { format } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { Memo } from "@/utils/types/memo";
import IconButton from "@/components/components/IconButton";

interface MemoListCardProps {
  memo: Memo;
  isActive: boolean;
  onClick: () => void;
}
export default function MemoListCard({
  memo,
  isActive,
  onClick,
}: Readonly<MemoListCardProps>) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`flex cursor-pointer flex-col gap-6px border-l-4 border-gray-200 p-8px duration-200 hover:bg-white ${
        isActive ? "bg-white" : "bg-transparent"
      }`}
      style={{ borderColor: Colors[memo.color as ColorKey][200] }}
    >
      <div className="flex-between">
        <p className="truncate-1-lines grow text-14px font-semibold">
          {memo.title}
        </p>
        <IconButton
          w={24}
          className="flex-shrink-0 bg-transparent text-14px text-gray-600 duration-200 hover:bg-gray-100 hover:text-main"
        >
          <FaRegBookmark />
        </IconButton>
      </div>
      <p
        className="truncate-2-lines text-14px leading-[140%] text-gray-600"
        dangerouslySetInnerHTML={{ __html: memo.content }}
      />
      <p className="text-right text-12px text-gray-600">
        {format(new Date(memo.createdAt), "yyyy-MM-dd")}
      </p>
    </div>
  );
}
