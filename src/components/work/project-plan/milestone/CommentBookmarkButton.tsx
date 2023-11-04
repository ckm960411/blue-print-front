import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";

interface CommentBookmarkButtonProps {
  commentId: number;
  isBookmarked: boolean;
}
export default function CommentBookmarkButton({
  commentId,
  isBookmarked,
}: CommentBookmarkButtonProps) {
  const { openToast } = useToastMessage();

  return (
    <button
      onClick={() => {}}
      className="absolute right-8px top-0 px-8px pb-8px"
    >
      <BsFillBookmarkFill
        className={`text-20px ${
          isBookmarked ? "text-red-500" : "text-gray-300"
        }`}
      />
    </button>
  );
}
