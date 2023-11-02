import TaskBookmarkButton from "@/components/work/components/task-card/TaskBookmarkButton";
import TaskCardDetailAccordion from "@/components/work/components/task-card/TaskCardDetailAccordion";
import TaskCardDropdown from "@/components/work/components/task-card/TaskCardDropdown";
import TaskColorForm from "@/components/work/components/task-card/TaskColorForm";
import TaskTags from "@/components/work/components/task-card/TaskTags";
import { Task } from "@/utils/types/task";
import React, { useState } from "react";

interface TaskCardProps {
  task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
  const [contentExpanded, setContentExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  return (
    <div className="relative flex flex-col gap-8px rounded-10px bg-white p-16px shadow-md duration-200 hover:shadow-lg">
      <TaskBookmarkButton taskId={task.id} isBookmarked={task.isBookmarked} />

      <TaskTags task={task} />

      <div className="flex-between gap-12px">
        <div className="flex items-center gap-8px">
          <TaskColorForm task={task} />
          <div className="truncate-1-lines text-16px font-bold">
            {task.title}
          </div>
        </div>
        <TaskCardDropdown task={task} />
      </div>

      {task.description && (
        <div className="text-14px leading-[150%] text-gray-600">
          {task.description}
        </div>
      )}

      {task.content && (
        <div className="relative">
          <div
            ref={(ref) =>
              setShowExpandButton(
                ref?.children?.length ? ref?.children?.length > 3 : false,
              )
            }
            className={`text-14px leading-[150%] text-gray-800 ${
              contentExpanded ? "" : "truncate-3-lines"
            }`}
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
          {showExpandButton && (
            <button
              onClick={() => setContentExpanded((prev) => !prev)}
              className="absolute bottom-0 right-0 text-14px text-gray-800"
            >
              {contentExpanded ? "접기" : "펼치기"}
            </button>
          )}
        </div>
      )}

      <TaskCardDetailAccordion task={task} />
    </div>
  );
}
