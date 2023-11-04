import React, { useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

import { QueryKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { deleteTask } from "@/utils/services/task";
import { Task } from "@/utils/types/task";

import IconButton from "@/components/components/IconButton";
import DeletePopup from "@/components/work/components/DeletePopup";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";

interface TaskCardDropdownProps {
  task: Task;
}
export default function TaskCardDropdown({ task }: TaskCardDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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
  useOnClickOutside(dropdownRef, closeDropdown);

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
      Icon: () => <BsPencil />,
      onClick: handleUpdate,
    },
    {
      title: "삭제하기",
      Icon: () => <BsTrash />,
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
        <IconButton
          onClick={openDropdown}
          className="bg-white hover:bg-gray-50"
        >
          <BiDotsVerticalRounded />
        </IconButton>

        {dropdownOpened && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full z-10 w-100px rounded-10px border border-gray-200 bg-white py-8px shadow-md"
          >
            {menus.map(({ title, Icon, onClick }, i) => (
              <div
                key={i}
                onClick={onClick}
                className="flex-center w-full cursor-pointer gap-8px bg-white p-8px text-14px hover:bg-gray-50"
              >
                <Icon />
                <span>{title}</span>
              </div>
            ))}
          </div>
        )}

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
