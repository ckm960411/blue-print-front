"use client";

import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

import { projectState } from "@/utils/recoil/store";
import { milestoneKeys } from "@/utils/common/query-keys";
import { getMilestoneById } from "@/utils/services/milestone";

import MilestoneDrawerTabs from "@/components/work/project-plan/sidetab/MilestoneDrawerTabs";
import MilestoneDetailHeader from "@/components/work/milestone/detail/MilestoneDetailHeader";
import MilestoneDetailProperties from "@/components/work/milestone/detail/MilestoneDetailProperties";

interface MilestonePageProps {
  params: { milestoneId: number };
}
export default function MilestonePage({
  params: { milestoneId },
}: Readonly<MilestonePageProps>) {
  const project = useRecoilValue(projectState);

  const { data: milestone } = useQuery(
    milestoneKeys.detail(milestoneId, project?.id),
    () => getMilestoneById(milestoneId),
    { onError: console.error },
  );

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
          <MilestoneDrawerTabs milestone={milestone} />
        </div>
      </div>
    </div>
  );
}
