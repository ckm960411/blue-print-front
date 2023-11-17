import MilestoneDetailProperties from "@/components/work/milestone/detail/MilestoneDetailProperties";
import MilestoneDrawerTabs from "@/components/work/project-plan/sidetab/MilestoneDrawerTabs";
import React from "react";
import { Milestone } from "@/utils/types/milestone";
import MilestoneDetailNav from "@/components/work/milestone/detail/MilestoneDetailNav";
import MilestoneDetailHeader from "@/components/work/milestone/detail/MilestoneDetailHeader";

interface MilestoneDetailProps {
  milestone: Milestone | null;
}
export default function MilestoneDetail({
  milestone,
}: Readonly<MilestoneDetailProps>) {
  if (!milestone) return <></>;

  return (
    <div className="h-full rounded-md border border-gray-200 shadow-md">
      <MilestoneDetailNav milestone={milestone} />
      <div
        className="h-full px-32px py-40px"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,121,0.025) 0%, rgba(0,212,255,0.02) 17%, rgba(0,212,255,0) 100%)",
        }}
      >
        <MilestoneDetailHeader milestone={milestone} />
        <MilestoneDetailProperties milestone={milestone} />
        <div className="pt-24px">
          <MilestoneDrawerTabs milestone={milestone} />
        </div>
      </div>
    </div>
  );
}
