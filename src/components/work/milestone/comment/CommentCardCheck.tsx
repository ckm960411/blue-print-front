import IconButton from "@/components/components/IconButton";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateCommentMutation } from "@/utils/hooks/react-query/useUpdateCommentMutation";
import React from "react";
import { BsCheckLg } from "react-icons/bs";

interface CommentCardCheckProps {
  commentId: number;
  isChecked: boolean;
}
export default function CommentCardCheck({
  commentId,
  isChecked,
}: CommentCardCheckProps) {
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
      onClick={() => updateCommentRequest({ isChecked: !isChecked })}
      className="rounded-md bg-transparent text-16px hover:bg-transparent"
      w={24}
    >
      <BsCheckLg className={isChecked ? "text-green-500" : "text-gray-800"} />
    </IconButton>
  );
}
