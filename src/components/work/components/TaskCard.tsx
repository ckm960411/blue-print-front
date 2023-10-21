import IconButton from "@/components/components/IconButton";
import TaskBookmarkButton from "@/components/work/components/task-card/TaskBookmarkButton";
import TaskEndAtForm from "@/components/work/components/task-card/TaskEndAtForm";
import TaskLinksForm from "@/components/work/components/task-card/TaskLinksForm";
import TaskPriorityForm from "@/components/work/components/task-card/TaskPriorityForm";
import TaskStartAtForm from "@/components/work/components/task-card/TaskStartAtForm";
import TaskTags from "@/components/work/components/task-card/TaskTags";
import { Task } from "@/utils/types/task";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { differenceInDays, format, startOfToday } from "date-fns";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { HiLink } from "react-icons/hi";

interface TaskCardProps {
  task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
  const [contentExpanded, setContentExpanded] = useState(false);

  const leftDays = task.endAt
    ? differenceInDays(new Date(task.endAt), startOfToday())
    : null;

  return (
    <div className="relative flex flex-col gap-8px bg-white p-16px shadow-md duration-200 hover:shadow-lg">
      <TaskBookmarkButton taskId={task.id} isBookmarked={task.isBookmarked} />

      <TaskTags task={task} />

      <div className="flex-between gap-12px">
        <div className="truncate-1-lines text-16px font-bold">{task.title}</div>
        <IconButton className="bg-white hover:bg-gray-50">
          <BiDotsVerticalRounded />
        </IconButton>
      </div>

      {task.description && (
        <div className="text-14px leading-[150%] text-gray-600">
          {task.description}
        </div>
      )}

      {task.content && (
        <div className="relative">
          <div
            className={`text-14px leading-[150%] text-gray-800 ${
              contentExpanded ? "" : "truncate-3-lines"
            }`}
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
          <button
            onClick={() => setContentExpanded((prev) => !prev)}
            className="absolute bottom-0 right-0 text-14px text-gray-800"
          >
            {contentExpanded ? "접기" : "펼치기"}
          </button>
        </div>
      )}

      <Accordion allowToggle>
        <AccordionItem style={{ border: "unset" }}>
          <AccordionPanel className="px-0">
            <div className="flex flex-col gap-16px border-t border-gray-200 pt-16px">
              <TaskStartAtForm task={task} />
              <TaskEndAtForm task={task} />
              <TaskPriorityForm task={task} />
              <TaskLinksForm task={task} />
            </div>
          </AccordionPanel>
          <AccordionButton className="p-0 hover:bg-transparent">
            <div className="flex-between w-full">
              <div className="mt-8px flex items-center gap-8px">
                <button className="flex-center gap-4px text-14px text-gray-600">
                  <GoComment />
                  <span>n</span>
                </button>
                <button className="flex-center gap-4px text-14px text-gray-600">
                  <HiLink />
                  <span>n</span>
                </button>
              </div>
              {leftDays && (
                <p
                  className={`text-12px ${
                    leftDays <= 2 ? "font-bold text-red-500" : "text-gray-600"
                  }`}
                >
                  {leftDays > 0
                    ? `${leftDays}일 남음`
                    : leftDays < 0
                    ? `${-leftDays}일 지남`
                    : "오늘"}
                </p>
              )}
            </div>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
