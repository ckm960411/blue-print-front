"use client";

import DateForm from "@/components/work/components/form/DateForm";
import TagsForm from "@/components/work/components/form/TagsForm";
import MilestoneClassificationForm from "@/components/work/project-plan/MilestoneClassificationForm";
import MilestonePriorityForm from "@/components/work/project-plan/MilestonePriorityForm";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneLinksForm from "@/components/work/project-plan/MilestoneLinksForm";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

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
      <DateForm
        startAt={milestone.startAt}
        endAt={milestone.endAt}
        dateType="startAt"
        parentType="milestone"
        parentId={milestone.id}
      />
      <DateForm
        startAt={milestone.startAt}
        endAt={milestone.endAt}
        dateType="endAt"
        parentType="milestone"
        parentId={milestone.id}
      />
      <MilestoneLinksForm milestone={milestone} />
      <TagsForm
        tags={milestone.tags}
        parentId={milestone.id}
        parentIdType="milestoneId"
      />
    </div>
  );
}
