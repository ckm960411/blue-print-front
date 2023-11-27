"use client";

import React from "react";

import { useMilestoneByIdQuery } from "@/utils/hooks/react-query/work/milestone/useMilestoneByIdQuery";

import MilestoneDetailTabs from "@/components/work/milestone/detail/MilestoneDetailTabs";
import MilestoneDetailHeader from "@/components/work/milestone/detail/MilestoneDetailHeader";
import MilestoneDetailProperties from "@/components/work/milestone/detail/MilestoneDetailProperties";

interface MilestonePageProps {
  params: { milestoneId: number };
}
export default function MilestonePage({
  params: { milestoneId },
}: Readonly<MilestonePageProps>) {
  const { data: milestone } = useMilestoneByIdQuery(milestoneId);

  if (!milestone) return <></>;

  return (
    <div>
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
          <MilestoneDetailTabs milestone={milestone} />
        </div>
      </div>
    </div>
  );
}
