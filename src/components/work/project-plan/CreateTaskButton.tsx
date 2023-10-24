import CreateButton from "@/components/work/components/CreateButton";
import React from "react";
import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";

interface CreateTaskButtonProps {}
export default function CreateTaskButton({}: CreateTaskButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen} />
      <CreateUpdateTaskModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
