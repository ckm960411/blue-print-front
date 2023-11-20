import React from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import TaskDetailNav from "@/components/work/task/TaskDetailNav";
import { getOneTaskById, TaskWithMilestone } from "@/utils/services/task";
import { useQuery } from "react-query";

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
  const { data } = useQuery(
    ["get-one-task", task.id],
    () => getOneTaskById(task.id),
    {
      enabled: isOpen,
      onSuccess: console.log,
      onError: console.error,
    },
  );

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
