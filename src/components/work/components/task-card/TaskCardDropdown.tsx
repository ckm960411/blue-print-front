import IconButton from "@/components/components/IconButton";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";
import { QueryKeys } from "@/utils/common/query-keys";
import { deleteTask } from "@/utils/services/task";
import { Task } from "@/utils/types/task";
import { useDisclosure } from "@chakra-ui/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

interface TaskCardDropdownProps {
  task: Task;
}
export default function TaskCardDropdown({ task }: TaskCardDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toast = useRef<Toast>(null);

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
      },
      onError: (e: any) => {
        toast.current?.show({
          severity: "error",
          summary: "문제 발생",
          detail:
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
      <Toast ref={toast} />
      <CreateUpdateTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={closeModal}
        type="update"
      />

      <div className="relative">
        <Popover isOpen={isDeletePopupOpen} placement="bottom-end">
          <PopoverTrigger>
            <IconButton
              onClick={openDropdown}
              className="bg-white hover:bg-gray-50"
            >
              <BiDotsVerticalRounded />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent className="max-w-[240px] p-16px text-14px font-medium text-gray-800">
            <div>정말 이 태스크를 삭제할까요?</div>
            <div className="mt-16px flex items-center justify-end gap-8px">
              <button
                onClick={closeDeletePopup}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={() => deleteTaskRequest(task.id)}
                className="rounded-md px-8px py-4px hover:bg-gray-100"
              >
                확인
              </button>
            </div>
          </PopoverContent>
        </Popover>

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
      </div>
    </>
  );
}