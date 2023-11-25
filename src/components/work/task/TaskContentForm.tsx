import { useUpdateTaskMutation } from "@/utils/hooks/react-query/work/task/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { Task } from "@/utils/types/task";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

const PlainEditor = dynamic(() => import("../components/PlainEditor"));

interface TaskContentFormProps {
  task: Task;
}
export default function TaskContentForm({ task }: TaskContentFormProps) {
  const project = useRecoilValue(projectState);

  const [type, setType] = useState<"create" | "update">(
    task.content ? "update" : "create",
  );
  const [content, setContent] = useState(task.content ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({
    onSuccess: handleClose,
  });

  const handleConfirm = () => {
    updateTaskRequest({
      projectId: project?.id,
      taskId: task.id,
      content,
    });
  };

  return (
    <div className="flex flex-col gap-16px px-24px">
      {isEditing ? (
        <>
          <PlainEditor
            type={type}
            placeholder="할일을 입력하세요"
            value={content}
            onChange={(v) => setContent(v)}
          />
          <div className="flex items-center gap-8px">
            <button
              onClick={handleClose}
              className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md bg-blue-500 px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
            >
              수정
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={handleOpen}
              className="rounded-md bg-gray-50 px-8px py-4px text-14px text-gray-600"
            >
              {type === "create" ? "태스크 작성" : "태스크 수정"}
            </button>
          </div>
          <div
            className="text-16px leading-[150%] text-gray-700"
            dangerouslySetInnerHTML={{ __html: task.content ?? "" }}
          />
        </>
      )}
    </div>
  );
}
