"use client";

import MilestoneEndAtForm from "@/components/work/project-plan/MilestoneEndAtForm";
import MilestoneStartAtForm from "@/components/work/project-plan/MilestoneStartAtForm";
import MilestoneEndDate from "@/components/work/project-plan/MilestoneEndDate";
import MilestoneClassification from "@/components/work/project-plan/MilestoneClassification";
import MilestonePriority from "@/components/work/project-plan/MilestonePriority";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneTags from "@/components/work/project-plan/MilestoneTags";
import MilestoneLinks from "@/components/work/project-plan/MilestoneLinks";
import { Milestone } from "@/utils/types/milestone";

interface MilestoneCardSummaryProps {
  milestone: Milestone;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChangeDate: (type: "startDate" | "endDate") => (date: Date) => void;
}
export default function MilestoneCardSummary({
  milestone,
  startDate,
  endDate,
  onChangeDate,
}: MilestoneCardSummaryProps) {
  return (
    <div className="flex flex-col gap-16px">
      <MilestoneStartAtForm milestone={milestone} />
      <MilestoneEndAtForm milestone={milestone} />
      <MilestoneEndDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDate("endDate")}
      />
      <MilestoneClassification />
      <MilestonePriority />
      <MilestoneProgress />
      <MilestoneTags />
      <MilestoneLinks />
    </div>
  );
}
