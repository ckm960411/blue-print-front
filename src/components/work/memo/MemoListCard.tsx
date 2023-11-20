import React from "react";
import { format } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { Memo } from "@/utils/types/memo";
import IconButton from "@/components/components/IconButton";

interface MemoListCardProps {
  memo: Memo;
}
export default function MemoListCard({ memo }: Readonly<MemoListCardProps>) {
  return (
    <div className="flex cursor-pointer flex-col gap-6px border-b border-gray-200 p-8px duration-200 hover:bg-white">
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
