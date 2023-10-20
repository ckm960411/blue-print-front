import { updateTask } from "@/utils/services/task";
import { useMutation } from "@tanstack/react-query";
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
  const { mutate: bookmarkRequest } = useMutation(
    ["update-task"],
    () => updateTask(taskId, { isBookmarked: !isBookmarked }),
    {
      onSuccess: (res) => console.log("res: ", res),
      onError: console.error,
    },
  );

  return (
    <button
      onClick={bookmarkRequest}
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
