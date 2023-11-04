import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";

interface CommentBookmarkButtonProps {
  commentId: number;
  isBookmarked: boolean;
}
export default function CommentBookmarkButton({
  commentId,
  isBookmarked,
}: CommentBookmarkButtonProps) {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />
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
    </>
  );
}
