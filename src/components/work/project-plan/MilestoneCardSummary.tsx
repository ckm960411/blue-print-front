"use client";

import DateForm from "@/components/work/components/form/DateForm";
import ProgressForm from "@/components/work/components/form/ProgressForm";
import TagsForm from "@/components/work/components/form/TagsForm";
import MilestoneClassificationForm from "@/components/work/project-plan/MilestoneClassificationForm";
import MilestonePriorityForm from "@/components/work/project-plan/MilestonePriorityForm";
import MilestoneLinksForm from "@/components/work/project-plan/MilestoneLinksForm";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

interface MilestoneCardSummaryProps {
  milestone: Milestone;
}
export default function MilestoneCardSummary({
  milestone,
}: Readonly<MilestoneCardSummaryProps>) {
  const { id, progress, startAt, endAt, tags } = milestone;

  return (
    <div className="flex flex-col gap-16px">
      <MilestoneClassificationForm milestone={milestone} />
      <ProgressForm parentType="milestone" parentId={id} progress={progress} />
      <MilestonePriorityForm milestone={milestone} />
      <DateForm
        startAt={startAt}
        endAt={endAt}
        dateType="startAt"
        parentType="milestone"
        parentId={id}
      />
      <DateForm
        startAt={startAt}
        endAt={endAt}
        dateType="endAt"
        parentType="milestone"
        parentId={id}
      />
      <MilestoneLinksForm milestone={milestone} />
      <TagsForm tags={tags} parentId={id} parentIdType="milestoneId" />
    </div>
  );
}
