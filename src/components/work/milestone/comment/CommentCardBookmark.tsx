import IconButton from "@/components/components/IconButton";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateCommentMutation } from "@/utils/hooks/react-query/work/comment/useUpdateCommentMutation";
import React from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

interface CommentCardBookmarkProps {
  commentId: number;
  isBookmarked: boolean;
}
export default function CommentCardBookmark({
  commentId,
  isBookmarked,
}: CommentCardBookmarkProps) {
  const { openToast } = useToastMessage();

  const { mutate: updateCommentRequest } = useUpdateCommentMutation(commentId, {
    onError: (e) => {
      openToast({
        status: "error",
        title: "문제 발생",
        description:
          e?.response?.data?.message || "댓글 수정 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <IconButton
      onClick={() => {
        updateCommentRequest({ isBookmarked: !isBookmarked });
      }}
      className="rounded-md bg-transparent text-16px hover:bg-transparent"
      w={24}
    >
      {isBookmarked ? (
        <BsFillBookmarkFill className="text-red-500" />
      ) : (
        <BsBookmark className="text-gray-800" />
      )}
    </IconButton>
  );
}
