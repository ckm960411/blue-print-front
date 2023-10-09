"use client";

import Link from "next/link";
import Unicode from "@/components/components/Unicode";
import MilestoneStartDate from "@/components/work/project-plan/MilestoneStartDate";
import MilestoneEndDate from "@/components/work/project-plan/MilestoneEndDate";
import MilestoneClassification from "@/components/work/project-plan/MilestoneClassification";

interface MilestoneCardSummaryProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChangeDate: (type: "startDate" | "endDate") => (date: Date) => void;
}
export default function MilestoneCardSummary({
  startDate,
  endDate,
  onChangeDate,
}: MilestoneCardSummaryProps) {
  return (
    <div className="flex flex-col gap-16px">
      <MilestoneStartDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDate("startDate")}
      />
      <MilestoneEndDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDate("endDate")}
      />
      <MilestoneClassification />
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          우선순위
        </p>
        <div className="flex items-center gap-4px rounded-md bg-purple-50 px-8px py-4px text-14px font-medium">
          <Unicode value="2b50" className="text-12px" />
          <Unicode value="2b50" className="text-12px" />
          <Unicode value="2b50" className="text-12px" />
          <Unicode value="2b50" className="text-12px" />
        </div>
      </div>
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          진행상태
        </p>
        <div className="rounded-md bg-purple-50 px-8px py-4px text-14px font-medium">
          진행중
        </div>
      </div>
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          태그
        </p>
        <div className="flex flex-wrap items-center gap-8px">
          <div className="rounded-md bg-blue-50 px-8px py-4px text-14px font-medium">
            태그1
          </div>
          <div className="rounded-md bg-teal-50 px-8px py-4px text-14px font-medium">
            태그2
          </div>
          <div className="rounded-md bg-orange-50 px-8px py-4px text-14px font-medium">
            태그3
          </div>
        </div>
      </div>
      <div className="flex items-start gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          링크
        </p>
        <div className="flex flex-col gap-12px">
          <Link
            href="https://uglyus.co.kr"
            target="_blank"
            className="text-14px text-blue-600 underline"
          >
            노션 기획 문서
          </Link>
          <Link
            href="https://uglyus.co.kr"
            target="_blank"
            className="text-14px text-blue-600 underline"
          >
            피그마
          </Link>
        </div>
      </div>
    </div>
  );
}
