import PriorityForm from "@/components/work/components/form/PriorityForm";
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

  const { id, progress, startAt, endAt, priority } = task;

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
          <ProgressForm parentType="task" parentId={id} progress={progress} />
          <DateForm
            startAt={startAt}
            endAt={endAt}
            dateType="startAt"
            parentType="task"
            parentId={id}
          />
          <DateForm
            startAt={startAt}
            endAt={endAt}
            dateType="endAt"
            parentType="task"
            parentId={id}
          />
          <PriorityForm parentType="task" parentId={id} priority={priority} />
          <TaskLinksForm task={task} />
        </div>
        <hr className="my-16px" />
        <TaskContentForm task={task} />
      </DrawerContent>
    </Drawer>
  );
}
