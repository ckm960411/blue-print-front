import MilestoneCardSummary from "@/components/work/project-plan/MilestoneCardSummary";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

interface MilestoneDetailPropertiesProps {
  milestone: Milestone;
}
export default function MilestoneDetailProperties({
  milestone,
}: Readonly<MilestoneDetailPropertiesProps>) {
  return (
    <div className="mt-24px">
      <MilestoneCardSummary milestone={milestone} />
    </div>
  );
}
