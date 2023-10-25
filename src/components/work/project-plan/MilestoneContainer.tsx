"use client";

import MilestoneCard from "@/components/work/project-plan/MilestoneCard";
import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { useMilestonesQuery } from "@/utils/hooks/react-query/useMilestonesQuery";
import React, { useEffect } from "react";

interface MilestoneContainerProps {
  status: MilestoneStatus;
}
export default function MilestoneContainer({
  status,
}: MilestoneContainerProps) {
  const { data: milestones = [], refetch } = useMilestonesQuery(status);

  useEffect(() => {
    refetch();
  }, [status]);

  return (
    <div className="flex flex-col gap-16px">
      {milestones.map((milestone, i) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          openContent={i === 0}
        />
      ))}
    </div>
  );
}
