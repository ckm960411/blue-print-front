import IconButton from "@/components/components/IconButton";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";
import { Task } from "@/utils/types/task";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useBoolean, useOnClickOutside } from "usehooks-ts";

interface TaskCardDropdownProps {
  task: Task;
}
export default function TaskCardDropdown({ task }: TaskCardDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    value: dropdownOpened,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean(false);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  useOnClickOutside(dropdownRef, closeDropdown);

  const menus = [
    {
      title: "수정하기",
      Icon: () => <BsPencil />,
      onClick: openModal,
    },
    {
      title: "삭제하기",
      Icon: () => <BsTrash />,
      onClick: () => {},
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
      </div>
    </>
  );
}
