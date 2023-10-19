import CreateTaskModal from "@/components/work/project-plan/CreateTaskModal";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";

interface CreateTaskButtonProps {}
export default function CreateTaskButton({}: CreateTaskButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="flex-center gap-8px rounded-md px-8px py-6px text-14px font-medium duration-200 hover:bg-gray-50"
      >
        <AiOutlinePlus />
        추가하기
      </button>

      <CreateTaskModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
