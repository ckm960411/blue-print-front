import React from "react";
import { useRecoilValue } from "recoil";
import { BsFillBookmarkFill } from "react-icons/bs";

import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";

interface TaskBookmarkButtonProps {
  taskId: number;
  isBookmarked: boolean;
}
export default function TaskBookmarkButton({
  taskId,
  isBookmarked,
}: TaskBookmarkButtonProps) {
  const { openToast } = useToastMessage();
  const project = useRecoilValue(projectState);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(taskId, {
    onError: (e) => {
      openToast({
        status: "error",
        title: "문제 발생",
        description:
          e?.response?.data?.message || "북마크 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <button
      onClick={() =>
        updateTaskRequest({
          isBookmarked: !isBookmarked,
          projectId: project?.id,
        })
      }
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
