import TaskEndAtForm from "@/components/work/components/task-card/TaskEndAtForm";
import TaskLinksForm from "@/components/work/components/task-card/TaskLinksForm";
import TaskPriorityForm from "@/components/work/components/task-card/TaskPriorityForm";
import TaskStartAtForm from "@/components/work/components/task-card/TaskStartAtForm";
import { Task } from "@/utils/types/task";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { differenceInDays, startOfToday } from "date-fns";
import { isNil } from "lodash";
import React from "react";
import { HiLink } from "react-icons/hi";
import { TbLayoutNavbarExpand } from "react-icons/tb";

interface TaskCardDetailAccordionProps {
  task: Task;
}
export default function TaskCardDetailAccordion({
  task,
}: TaskCardDetailAccordionProps) {
  const leftDays = task.endAt
    ? differenceInDays(new Date(task.endAt), startOfToday())
    : null;

  return (
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
        <AccordionButton className="h-24px p-0 hover:bg-transparent">
          <div className="flex-between w-full">
            <div className="flex items-center gap-8px">
              {task.priority === 5 && (
                <div className="rounded-full border border-red-500 px-8px py-4px text-14px font-bold text-red-500">
                  매우 중요
                </div>
              )}
              {task.priority === 4 && (
                <div className="rounded-full border border-orange-500 px-8px py-4px text-14px font-bold text-orange-500">
                  중요
                </div>
              )}
              {task.links.length > 0 && (
                <button className="flex-center gap-4px text-14px text-gray-600">
                  <HiLink />
                  <span>{task.links.length}</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-16px">
              {isNil(leftDays) || (
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
              <TbLayoutNavbarExpand className="text-20px" />
            </div>
          </div>
        </AccordionButton>
      </AccordionItem>
    </Accordion>
  );
}
