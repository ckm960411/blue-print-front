import TaskEndAtForm from "@/components/work/components/task-card/TaskEndAtForm";
import TaskLinksForm from "@/components/work/components/task-card/TaskLinksForm";
import TaskPriorityForm from "@/components/work/components/task-card/TaskPriorityForm";
import TaskProgressForm from "@/components/work/components/task-card/TaskProgressForm";
import TaskStartAtForm from "@/components/work/components/task-card/TaskStartAtForm";
import TaskTags from "@/components/work/components/task-card/TaskTags";
import React from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import TaskDetailNav from "@/components/work/task/TaskDetailNav";
import { getOneTaskById } from "@/utils/services/task";
import { useQuery } from "react-query";

interface TaskDetailDrawerProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
}
export default function TaskDetailDrawer({
  taskId,
  isOpen,
  onClose,
}: Readonly<TaskDetailDrawerProps>) {
  const { data: task } = useQuery(
    ["get-one-task", taskId],
    () => getOneTaskById(taskId),
    {
      enabled: isOpen,
      onSuccess: console.log,
      onError: console.error,
    },
  );

  if (!task) return <></>;

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
        <div className="flex flex-col gap-16px p-24px">
          {task.milestoneTitle && (
            <p className="truncate-1-lines text-16px font-semibold text-gray-800">
              {task.milestoneTitle}
            </p>
          )}
          <p className="truncate-2-lines text-22px font-bold leading-[140%]">
            {task.title}
          </p>
          {task.description && (
            <p className="text-16px leading-[150%] text-gray-600">
              {task.description}
            </p>
          )}
          <TaskTags task={task} />
        </div>
        <div className="flex flex-col gap-16px px-24px pt-16px">
          <TaskProgressForm task={task} />
          <TaskStartAtForm task={task} />
          <TaskEndAtForm task={task} />
          <TaskPriorityForm task={task} />
          <TaskLinksForm task={task} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
