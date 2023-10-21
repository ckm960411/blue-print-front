import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";

interface TaskBookmarkButtonProps {
  taskId: number;
  isBookmarked: boolean;
}
export default function TaskBookmarkButton({
  taskId,
  isBookmarked,
}: TaskBookmarkButtonProps) {
  const toast = useRef<Toast>(null);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation(taskId, {
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "문제 발생",
        detail: "북마크 중 문제가 발생했습니다.",
      });
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <button
        onClick={() => updateTaskRequest({ isBookmarked: !isBookmarked })}
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
