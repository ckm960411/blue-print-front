import { QueryKeys } from "@/utils/common/query-keys";
import { updateTask } from "@/utils/services/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { mutate: bookmarkRequest } = useMutation(
    ["update-task"],
    () => updateTask(taskId, { isBookmarked: !isBookmarked }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
      },
      onError: () => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail: "북마크 중 문제가 발생했습니다.",
        });
      },
    },
  );

  return (
    <>
      <Toast ref={toast} />
      <button
        onClick={() => bookmarkRequest()}
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
