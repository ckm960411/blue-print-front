"use client";

import MilestoneEndAtForm from "@/components/work/project-plan/MilestoneEndAtForm";
import MilestoneStartAtForm from "@/components/work/project-plan/MilestoneStartAtForm";
import MilestoneClassification from "@/components/work/project-plan/MilestoneClassification";
import MilestonePriorityForm from "@/components/work/project-plan/MilestonePriorityForm";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneTags from "@/components/work/project-plan/MilestoneTags";
import MilestoneLinksForm from "@/components/work/project-plan/MilestoneLinksForm";
import { Milestone } from "@/utils/types/milestone";

interface MilestoneCardSummaryProps {
  milestone: Milestone;
}
export default function MilestoneCardSummary({
  milestone,
}: MilestoneCardSummaryProps) {
  return (
    <div className="flex flex-col gap-16px">
      <MilestoneStartAtForm milestone={milestone} />
      <MilestoneEndAtForm milestone={milestone} />
      <MilestoneClassification />
      <MilestonePriorityForm milestone={milestone} />
      <MilestoneProgress />
      <MilestoneLinksForm milestone={milestone} />
      <MilestoneTags milestone={milestone} />
    </div>
  );
}
