import DeletePopup from "@/components/work/components/DeletePopup";
import { milestoneKeys, QueryKeys, taskKeys } from "@/utils/common/query-keys";
import { useUpdateTaskMutation } from "@/utils/hooks/react-query/useUpdateTaskMutation";
import { projectState } from "@/utils/recoil/store";
import { deleteTask } from "@/utils/services/task";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { BsBookmark, BsFillBookmarkFill, BsTrash } from "react-icons/bs";
import { Task } from "@/utils/types/task";
import IconButton from "@/components/components/IconButton";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface TaskDetailNavProps {
  task: Task;
  milestoneId?: number;
}
export default function TaskDetailNav({
  task,
  milestoneId,
}: Readonly<TaskDetailNavProps>) {
  const project = useRecoilValue(projectState);
  const queryClient = useQueryClient();

  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();

  const { mutate: updateTaskRequest } = useUpdateTaskMutation({ milestoneId });

  const { mutate: deleteTaskRequest } = useMutation(
    ["delete-task"],
    (id: number) => deleteTask(id),
    {
      onSuccess: (deletedTask) => {
        queryClient.invalidateQueries(
          taskKeys.list({ projectId: project?.id, milestoneId }),
        );
        queryClient.removeQueries(
          taskKeys.detail({
            taskId: task.id,
            projectId: project?.id,
            milestoneId,
          }),
        );
        queryClient.invalidateQueries(QueryKeys.getWorkCount());
      },
      onError: console.error,
    },
  );

  const handleDelete = () => {
    closeDeletePopup();
    deleteTaskRequest(task.id);
  };

  return (
    <div className="flex h-32px items-center justify-end gap-4px border-b border-gray-200 px-16px">
      <IconButton
        w={24}
        onClick={() =>
          updateTaskRequest({
            taskId: task.id,
            isBookmarked: !task.isBookmarked,
          })
        }
      >
        {task.isBookmarked ? (
          <BsFillBookmarkFill className="text-14px text-red-500" />
        ) : (
          <BsBookmark className="text-14px" />
        )}
      </IconButton>
      <div className="relative">
        <IconButton
          onClick={openDeletePopup}
          className="rounded-md bg-transparent text-18px hover:bg-transparent"
          w={24}
        >
          <BsTrash />
        </IconButton>

        <DeletePopup
          open={isDeletePopupOpen}
          title="정말 이 태스크를 삭제할까요?"
          onClose={closeDeletePopup}
          onComplete={handleDelete}
        />
      </div>
    </div>
  );
}
