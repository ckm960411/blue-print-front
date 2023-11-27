import { useUpdateMemoMutation } from "@/utils/hooks/react-query/work/memo/useUpdateMemoMutation";
import React from "react";
import { format } from "date-fns";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";

import { Colors } from "@/utils/common/color";
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
  const { id, color, title, content, createdAt, isBookmarked } = memo;

  const { mutate: updateMemoRequest } = useUpdateMemoMutation({ memoId: id });

  const handleBookmark = () => {
    updateMemoRequest({ isBookmarked: !isBookmarked });
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`flex cursor-pointer flex-col gap-6px border-l-4 border-gray-200 p-8px duration-200 hover:bg-white ${
        isActive ? "bg-white" : "bg-transparent"
      }`}
      style={{ borderColor: Colors[color][200] }}
    >
      <div className="flex-between">
        <p className="truncate-1-lines grow text-14px font-semibold">{title}</p>
        <IconButton
          w={24}
          onClick={handleBookmark}
          className="flex-shrink-0 bg-transparent text-14px text-gray-600 duration-200 hover:bg-gray-100 hover:text-main"
        >
          {isBookmarked ? (
            <BsFillBookmarkFill className="text-red-500" />
          ) : (
            <FaRegBookmark />
          )}
        </IconButton>
      </div>
      <p
        className="truncate-2-lines text-14px leading-[140%] text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <p className="text-right text-12px text-gray-600">
        {format(new Date(createdAt), "yyyy-MM-dd")}
      </p>
    </div>
  );
}
