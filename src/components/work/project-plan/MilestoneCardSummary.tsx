"use client";

import DateForm from "@/components/work/components/form/DateForm";
import PriorityForm from "@/components/work/components/form/PriorityForm";
import ProgressForm from "@/components/work/components/form/ProgressForm";
import TagsForm from "@/components/work/components/form/TagsForm";
import MilestoneClassificationForm from "@/components/work/project-plan/MilestoneClassificationForm";
import MilestoneLinksForm from "@/components/work/project-plan/MilestoneLinksForm";
import { Milestone } from "@/utils/types/milestone";
import React from "react";

interface MilestoneCardSummaryProps {
  milestone: Milestone;
}
export default function MilestoneCardSummary({
  milestone,
}: Readonly<MilestoneCardSummaryProps>) {
  const { id, progress, startAt, endAt, tags, priority } = milestone;

  return (
    <div className="flex flex-col gap-16px">
      <MilestoneClassificationForm milestone={milestone} />
      <ProgressForm parentType="milestone" parentId={id} progress={progress} />
      <PriorityForm parentType="milestone" parentId={id} priority={priority} />
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
