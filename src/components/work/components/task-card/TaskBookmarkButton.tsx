import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";

interface TaskBookmarkButtonProps {
  taskId: number;
  isBookmarked: boolean;
}
export default function TaskBookmarkButton({
  taskId,
  isBookmarked,
}: TaskBookmarkButtonProps) {
  return (
    <button className="absolute right-8px top-0 px-8px pb-8px">
      <BsFillBookmarkFill className="text-20px text-gray-300" />
    </button>
  );
}
