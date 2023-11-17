import VerticalDotsButton from "@/components/work/components/VerticalDotsButton";
import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { Milestone } from "@/utils/types/milestone";
import React from "react";
import { CiStar } from "react-icons/ci";
import { GrTask } from "react-icons/gr";
import { FaRegStickyNote } from "react-icons/fa";

interface MilestoneListProps {
  milestones: Milestone[];
}
export default function MilestoneList({
  milestones,
}: Readonly<MilestoneListProps>) {
  return (
    <div className="flex flex-col gap-8px">
      {milestones.map((milestone) => {
        const remainDaysData = getRemainDaysText(milestone.endAt);
        return (
          <div
            key={milestone.id}
            className="cursor-pointer rounded-md border border-gray-200 p-8px duration-200 hover:shadow-md"
          >
            <div className="flex flex-col gap-8px">
              <div className="flex items-center gap-8px">
                <div className="grow">
                  <div
                    className="inline rounded-md p-4px text-12px font-medium"
                    style={{
                      backgroundColor: Colors[milestone.color][50],
                      color: Colors[milestone.color][500],
                    }}
                  >
                    {milestone.classification ?? "분류 추가"}
                  </div>
                </div>
                <VerticalDotsButton onClick={() => {}} />
              </div>
              <div className="flex items-center gap-8px">
                <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
                  <CiStar />
                  <span className="text-12px font-medium">
                    {milestone.priority}
                  </span>
                </div>
                <p className="truncate-1-lines text-16px font-semibold">
                  {milestone.title}
                </p>
              </div>
              <div className="flex items-center gap-8px">
                <div className="grow">
                  {remainDaysData && (
                    <p
                      className={`text-12px ${
                        remainDaysData.remainDays <= 2
                          ? "font-medium text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      {remainDaysData.remainDaysText}
                    </p>
                  )}
                </div>
                <div className="flex flex-shrink-0 items-center gap-4px">
                  <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
                    <GrTask className="text-10px" />
                    <span className="text-12px font-medium">
                      {milestone.tasks.length}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-6px rounded-full border border-gray-200 px-6px py-4px text-16px">
                    <FaRegStickyNote className="text-12px" />
                    <span className="text-10px font-medium">
                      {milestone.memos.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
