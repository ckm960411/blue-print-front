"use client";

import MilestoneCard from "@/components/work/project-plan/MilestoneCard";
import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMilestones } from "@/utils/services/milestone";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface MilestoneContainerProps {
  status: MilestoneStatus;
}
export default function MilestoneContainer({
  status,
}: MilestoneContainerProps) {
  const { data: milestones = [], refetch } = useQuery(
    QueryKeys.getAllMilestones(status),
    () => getAllMilestones({ progress: status === "ALL" ? undefined : status }),
    { onError: console.error },
  );

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
