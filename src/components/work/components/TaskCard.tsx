import IconButton from "@/components/components/IconButton";
import MilestoneClassification from "@/components/work/project-plan/MilestoneClassification";
import MilestoneEndDate from "@/components/work/project-plan/MilestoneEndDate";
import MilestoneLinks from "@/components/work/project-plan/MilestoneLinks";
import MilestonePriority from "@/components/work/project-plan/MilestonePriority";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneStartDate from "@/components/work/project-plan/MilestoneStartDate";
import MilestoneTags from "@/components/work/project-plan/MilestoneTags";
import { Task } from "@/utils/types/task";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { HiLink } from "react-icons/hi";

interface TaskCardProps {
  task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
  const [contentExpanded, setContentExpanded] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleChangeDate = (type: "startDate" | "endDate") => (date: Date) => {
    if (type === "startDate") return setStartDate(date);
    else return setEndDate(date);
  };

  return (
    <div className="relative flex flex-col gap-8px bg-white p-16px shadow-md duration-200 hover:shadow-lg">
      <button className="absolute right-8px top-0 px-8px pb-8px">
        <BsFillBookmarkFill className="text-20px text-gray-300" />
      </button>

      {/* TODO: Tag 반영 필요 */}
      <div className="flex flex-wrap items-center gap-8px">
        <div className="rounded-xl bg-orange-50 px-12px py-6px text-14px font-semibold text-orange-600">
          Planning
        </div>
        <div className="rounded-xl bg-blue-50 px-12px py-6px text-14px font-semibold text-blue-600">
          개발중
        </div>
      </div>

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
              <MilestoneStartDate
                startDate={startDate}
                endDate={endDate}
                onChange={handleChangeDate("startDate")}
              />
              <MilestoneEndDate
                startDate={startDate}
                endDate={endDate}
                onChange={handleChangeDate("endDate")}
              />
              <MilestonePriority />
              <MilestoneTags />
              <MilestoneLinks />
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
              <p className="text-12px text-gray-600">n일 남음</p>
            </div>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
