import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { Milestone } from "@/utils/types/milestone";
import React from "react";
import { HiLink } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";

interface MilestoneDetailHeaderProps {
  milestone: Milestone;
}
export default function MilestoneDetailHeader({
  milestone,
}: Readonly<MilestoneDetailHeaderProps>) {
  const remainDaysData = getRemainDaysText(milestone.endAt);

  return (
    <div>
      <div>
        <button
          className="rounded-md px-8px py-4px text-14px font-semibold"
          style={{
            backgroundColor: Colors[milestone.color][100],
            color: Colors[milestone.color][500],
          }}
        >
          {milestone.classification}
        </button>
      </div>
      <p className="mt-16px text-28px font-bold">{milestone.title}</p>
      <div className="flex items-center gap-32px border-b border-gray-200 py-24px">
        {remainDaysData && (
          <div
            className={`flex-center gap-6px text-12px ${
              remainDaysData.remainDays <= 2
                ? "font-medium text-red-500"
                : "text-gray-600"
            }`}
          >
            <IoCalendarClearOutline />
            <span>{remainDaysData.remainDaysText}</span>
          </div>
        )}
        {milestone.links.length > 0 && (
          <div className="flex-center gap-4px text-14px text-gray-600">
            <HiLink />
            <span>{milestone.links.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
