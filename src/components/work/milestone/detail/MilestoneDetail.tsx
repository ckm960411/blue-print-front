import React from "react";

import { useMilestoneByIdQuery } from "@/utils/hooks/react-query/work/milestone/useMilestoneByIdQuery";

import MilestoneDetailProperties from "@/components/work/milestone/detail/MilestoneDetailProperties";
import MilestoneDetailTabs from "@/components/work/milestone/detail/MilestoneDetailTabs";
import MilestoneDetailNav from "@/components/work/milestone/detail/MilestoneDetailNav";
import MilestoneDetailHeader from "@/components/work/milestone/detail/MilestoneDetailHeader";

interface MilestoneDetailProps {
  milestoneId: number;
  isDrawer?: boolean;
}
export default function MilestoneDetail({
  milestoneId,
  isDrawer = false,
}: Readonly<MilestoneDetailProps>) {
  const { data: milestone } = useMilestoneByIdQuery(milestoneId);

  return milestone ? (
    <div
      className={`rounded-md border border-gray-200 shadow-md ${
        isDrawer ? "h-full" : "min-h-[calc(100vh-260px)]"
      }`}
    >
      <MilestoneDetailNav milestone={milestone} />
      <div
        className={`h-full py-40px ${isDrawer ? "px-16px" : "px-32px"}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,121,0.025) 0%, rgba(0,212,255,0.02) 17%, rgba(0,212,255,0) 100%)",
        }}
      >
        <MilestoneDetailHeader milestone={milestone} />
        <MilestoneDetailProperties milestone={milestone} />
        <div className="pt-24px">
          <MilestoneDetailTabs milestone={milestone} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-center min-h-[calc(100vh-260px)]">마일스톤 없음</div>
  );
}
