import IconButton from "@/components/components/IconButton";
import { TaskWithMilestone } from "@/utils/services/task";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrExpand } from "react-icons/gr";

interface TaskDetailDrawerProps {
  task: TaskWithMilestone;
  isOpen: boolean;
  onClose: () => void;
}
export default function TaskDetailDrawer({
  task,
  isOpen,
  onClose,
}: Readonly<TaskDetailDrawerProps>) {
  const router = useRouter();

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <div className="flex h-32px items-center justify-between border-b border-gray-200 px-16px">
          <IconButton
            w={24}
            onClick={() => router.push(`/work/task/${task.id}`)}
          >
            <GrExpand className="text-12px" />
          </IconButton>
          <IconButton w={24}>
            <BiDotsVerticalRounded className="text-18px" />
          </IconButton>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
