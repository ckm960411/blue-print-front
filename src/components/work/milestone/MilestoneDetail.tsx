import IconButton from "@/components/components/IconButton";
import { Colors } from "@/utils/common/color";
import { getRemainDaysText } from "@/utils/common/etc/getRemainDaysText";
import { Milestone } from "@/utils/types/milestone";
import React from "react";
import { GrExpand } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiLink } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";

interface MilestoneDetailProps {
  milestone: Milestone | null;
}
export default function MilestoneDetail({
  milestone,
}: Readonly<MilestoneDetailProps>) {
  if (!milestone) return <></>;

  const remainDaysData = getRemainDaysText(milestone.endAt);

  return (
    <div className="h-full rounded-md border border-gray-200 shadow-md">
      <div className="flex h-32px items-center justify-between px-16px">
        <IconButton w={24}>
          <GrExpand className="text-12px" />
        </IconButton>
        <IconButton w={24}>
          <BiDotsVerticalRounded className="text-18px" />
        </IconButton>
      </div>
      <div
        className="h-full px-32px py-40px"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,121,0.025) 0%, rgba(0,212,255,0.02) 17%, rgba(0,212,255,0) 100%)",
        }}
      >
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
        <div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </div>
  );
}
