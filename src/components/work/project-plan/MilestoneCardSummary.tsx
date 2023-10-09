"use client";

import Link from "next/link";
import Unicode from "@/components/components/Unicode";
import MilestoneCalendarButton from "@/components/work/project-plan/MilestoneCalendarButton";

interface MilestoneCardSummaryProps {}
export default function MilestoneCardSummary({}: MilestoneCardSummaryProps) {
  return (
    <div className="flex flex-col gap-16px">
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          시작일
        </p>
        <MilestoneCalendarButton />
      </div>
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          종료일
        </p>
        <MilestoneCalendarButton />
      </div>
      <div className="flex h-14px items-center gap-8px">
        <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
          분류
        </p>
        <div className="flex flex-wrap items-center gap-8px">
          <div className="rounded-md bg-blue-50 px-8px py-4px text-14px font-medium">
            Feature
          </div>
          <div className="rounded-md bg-teal-50 px-8px py-4px text-14px font-medium">
            Chore
          </div>
          <div className="rounded-md bg-red-50 px-8px py-4px text-14px font-medium">
            Hotfix
          </div>
        </div>
      </div>
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
