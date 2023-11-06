import DropdownMenu from "@/components/work/components/task-card/DropdownMenu";
import VerticalDotsButton from "@/components/work/components/VerticalDotsButton";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation, useQueryClient } from "react-query";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useBoolean } from "usehooks-ts";

import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { deleteTask } from "@/utils/services/task";
import { Task } from "@/utils/types/task";

import DeletePopup from "@/components/work/components/DeletePopup";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";

interface TaskCardDropdownProps {
  task: Task;
}
export default function TaskCardDropdown({ task }: TaskCardDropdownProps) {
  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const {
    isOpen: isDeletePopupOpen,
    onOpen: openDeletePopup,
    onClose: closeDeletePopup,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const { mutate: deleteTaskRequest } = useMutation(
    ["delete-task"],
    (id: number) => deleteTask(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllTasks());
        queryClient.invalidateQueries(QueryKeys.getAllMemos());
        queryClient.invalidateQueries(QueryKeys.getThisMonthTasks());
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "문제 발생",
          description:
            e?.response?.data?.message ||
            "태스크 삭제 중 문제가 발생했습니다. 다시 시도해주세요.",
        });
      },
    },
  );

  const handleUpdate = () => {
    closeDropdown();
    openModal();
  };

  const handleDelete = () => {
    closeDropdown();
    openDeletePopup();
  };

  const menus = [
    {
      title: "수정하기",
      icon: <BsPencil />,
      onClick: handleUpdate,
    },
    {
      title: "삭제하기",
      icon: <BsTrash />,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <CreateUpdateTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={closeModal}
        type="update"
      />

      <div className="relative">
        <VerticalDotsButton onClick={openDropdown} />

        <DropdownMenu
          open={dropdownOpened}
          menus={menus}
          onClose={closeDropdown}
        />

        <DeletePopup
          open={isDeletePopupOpen}
          title="정말 이 태스크를 삭제할까요?"
          onClose={closeDeletePopup}
          onComplete={() => deleteTaskRequest(task.id)}
        />
      </div>
    </>
  );
}
