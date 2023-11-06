"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { QueryKeys } from "@/utils/common/query-keys";
import { getMilestoneById } from "@/utils/services/milestone";

import MilestoneCardHeader from "@/components/work/project-plan/MilestoneCardHeader";
import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import MilestoneDrawerTabs from "@/components/work/project-plan/sidetab/MilestoneDrawerTabs";
import MilestoenBookmarkButton from "@/components/work/project-plan/tooltip-button/MilestoenBookmarkButton";
import MilestoneTrashButton from "@/components/work/project-plan/tooltip-button/MilestoneTrashButton";

interface MilestonePageProps {
  params: { milestoneId: number };
}
export default function MilestonePage({
  params: { milestoneId },
}: MilestonePageProps) {
  const [status, setStatus] = useState<MilestoneStatus>("ALL");

  const { data: milestone } = useQuery(
    QueryKeys.getMilestoneById(milestoneId),
    () => getMilestoneById(milestoneId),
    { onError: console.error },
  );

  useEffect(() => {
    getMilestoneById(milestoneId).then(console.log).catch(console.error);
  }, []);

  if (!milestone) return <></>;

  return (
    <div className="h-full bg-gray-50 p-0px sm:p-16px">
      <div className="relative mx-auto flex h-full max-w-screen-xl flex-col gap-32px rounded-10px bg-white p-16px">
        <div
          className={`absolute right-16px top-20px flex items-center gap-8px`}
        >
          <MilestoneTrashButton milestone={milestone} />
          <MilestoenBookmarkButton milestone={milestone} />
        </div>

        <MilestoneCardHeader milestone={milestone} toggleOpened isDetail />
        <MilestoneCardSummary milestone={milestone} />
        <MilestoneDrawerTabs milestone={milestone} />
      </div>
    </div>
  );
}
