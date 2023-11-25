import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";

import { taskKeys } from "@/utils/common/query-keys";
import { projectState } from "@/utils/recoil/store";
import { getOneTaskById } from "@/utils/services/task";

import DateForm from "@/components/work/components/form/DateForm";
import ProgressForm from "@/components/work/components/form/ProgressForm";
import TaskLinksForm from "@/components/work/components/task-card/TaskLinksForm";
import TaskPriorityForm from "@/components/work/components/task-card/TaskPriorityForm";
import TaskContentForm from "@/components/work/task/TaskContentForm";
import TaskDetailHeader from "@/components/work/task/TaskDetailHeader";
import TaskDetailNav from "@/components/work/task/TaskDetailNav";

interface TaskDetailDrawerProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
  milestoneTitle: string | null;
  milestoneId?: number;
}
export default function TaskDetailDrawer({
  taskId,
  isOpen,
  onClose,
  milestoneTitle,
  milestoneId,
}: Readonly<TaskDetailDrawerProps>) {
  const project = useRecoilValue(projectState);

  const { data: task } = useQuery(
    taskKeys.detail({ taskId, projectId: project?.id }),
    () => getOneTaskById(taskId),
    { enabled: isOpen, onError: console.error },
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
        <TaskDetailNav task={task} milestoneId={milestoneId} />
        <TaskDetailHeader
          task={task}
          milestoneTitle={milestoneTitle}
          milestoneId={milestoneId}
        />
        <div className="flex flex-col gap-16px px-24px pt-16px">
          <ProgressForm
            parentType="task"
            parentId={task.id}
            progress={task.progress}
          />
          <DateForm
            startAt={task.startAt}
            endAt={task.endAt}
            dateType="startAt"
            parentType="task"
            parentId={task.id}
          />
          <DateForm
            startAt={task.startAt}
            endAt={task.endAt}
            dateType="endAt"
            parentType="task"
            parentId={task.id}
          />
          <TaskPriorityForm task={task} milestoneId={milestoneId} />
          <TaskLinksForm task={task} />
        </div>
        <hr className="my-16px" />
        <TaskContentForm task={task} />
      </DrawerContent>
    </Drawer>
  );
}
