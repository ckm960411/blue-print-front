import React from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import TaskDetailNav from "@/components/work/task/TaskDetailNav";
import { TaskWithMilestone } from "@/utils/services/task";

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
  return (
    <Drawer
      id="task-list-card-drawer"
      placement="right"
      onClose={onClose}
      isOpen={isOpen}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <TaskDetailNav task={task} />
      </DrawerContent>
    </Drawer>
  );
}
