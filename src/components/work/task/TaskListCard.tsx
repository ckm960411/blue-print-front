import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CiCalendar } from "react-icons/ci";

import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { TaskWithMilestone } from "@/utils/services/task";
import TaskDetailDrawer from "@/components/work/task/TaskDetailDrawer";

interface TaskListCardProps {
  task: TaskWithMilestone;
}
export default function TaskListCard({ task }: Readonly<TaskListCardProps>) {
  const remainDaysData = getRemainDaysText(task.endAt);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        onClick={onOpen}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        className="flex flex-col gap-6px rounded-md bg-white p-8px font-medium shadow-sm duration-200 hover:shadow-md"
      >
        {task.milestoneTitle && (
          <p
            className="truncate-1-lines text-12px"
            style={{ color: Colors[task.milestoneColor ?? task.color][400] }}
          >
            {task.milestoneTitle}
          </p>
        )}
        <div className="truncate-1-lines text-14px font-semibold">
          {task.title}
        </div>
        {task.description && (
          <div className="truncate-3-lines text-12px leading-[140%] text-gray-600">
            {task.description}
          </div>
        )}
        <hr />
        <div className="flex-between">
          <div>
            {task.tags.length > 0 && (
              <button className="text-12px">{task.tags[0].name}</button>
            )}
          </div>
          {remainDaysData && (
            <div className="flex-center gap-6px">
              <p
                className={`text-12px ${
                  remainDaysData.remainDays <= 2
                    ? "font-medium text-red-500"
                    : "text-gray-600"
                }`}
              >
                {remainDaysData.remainDaysText}
              </p>
              <CiCalendar />
            </div>
          )}
        </div>
      </div>

      <TaskDetailDrawer task={task} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
