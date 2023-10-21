"use client";

import MilestoneCard from "@/components/work/project-plan/MilestoneCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllMilestones } from "@/utils/services/milestone";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface MilestoneContainerProps {}
export default function MilestoneContainer({}: MilestoneContainerProps) {
  const { data: milestones = [] } = useQuery(
    QueryKeys.getAllMilestones(),
    getAllMilestones,
    { onError: console.error },
  );

  return (
    <div className="flex flex-col gap-16px">
      {milestones.map((milestone, i) => (
        <MilestoneCard key={milestone.id} openContent={i === 0} />
      ))}
    </div>
  );
}
