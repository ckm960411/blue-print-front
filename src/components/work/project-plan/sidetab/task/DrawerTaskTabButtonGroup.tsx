import CreateUpdateTaskModal from "@/components/work/project-plan/CreateUpdateTaskModal";
import { Milestone } from "@/utils/types/milestone";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";

interface DrawerTaskTabButtonGroupProps {
  milestone: Milestone;
}
export default function DrawerTaskTabButtonGroup({
  milestone,
}: DrawerTaskTabButtonGroupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex items-center justify-end gap-8px">
      <button
        onClick={onOpen}
        className="rounded-md border border-gray-200 px-8px py-6px text-14px text-gray-600 hover:bg-gray-100"
      >
        할일 추가
      </button>

      <CreateUpdateTaskModal
        isOpen={isOpen}
        onClose={onClose}
        milestoneId={milestone.id}
      />
    </div>
  );
}
