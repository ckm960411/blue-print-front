"use client";

import TagsForm from "@/components/work/components/form/TagsForm";
import MilestoneEndAtForm from "@/components/work/project-plan/MilestoneEndAtForm";
import MilestoneStartAtForm from "@/components/work/project-plan/MilestoneStartAtForm";
import MilestoneClassificationForm from "@/components/work/project-plan/MilestoneClassificationForm";
import MilestonePriorityForm from "@/components/work/project-plan/MilestonePriorityForm";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneLinksForm from "@/components/work/project-plan/MilestoneLinksForm";
import { Milestone } from "@/utils/types/milestone";

interface MilestoneCardSummaryProps {
  milestone: Milestone;
}
export default function MilestoneCardSummary({
  milestone,
}: Readonly<MilestoneCardSummaryProps>) {
  return (
    <div className="flex flex-col gap-16px">
      <MilestoneClassificationForm milestone={milestone} />
      <MilestoneProgress milestone={milestone} />
      <MilestonePriorityForm milestone={milestone} />
      <MilestoneStartAtForm milestone={milestone} />
      <MilestoneEndAtForm milestone={milestone} />
      <MilestoneLinksForm milestone={milestone} />
      <TagsForm
        tags={milestone.tags}
        parentId={milestone.id}
        parentIdType="milestoneId"
      />
    </div>
  );
}
