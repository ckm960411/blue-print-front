"use client";

import MilestoneStartDate from "@/components/work/project-plan/MilestoneStartDate";
import MilestoneEndDate from "@/components/work/project-plan/MilestoneEndDate";
import MilestoneClassification from "@/components/work/project-plan/MilestoneClassification";
import MilestonePriority from "@/components/work/project-plan/MilestonePriority";
import MilestoneProgress from "@/components/work/project-plan/MilestoneProgress";
import MilestoneTags from "@/components/work/project-plan/MilestoneTags";
import MilestoneLinks from "@/components/work/project-plan/MilestoneLinks";

interface MilestoneCardSummaryProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChangeDate: (type: "startDate" | "endDate") => (date: Date) => void;
}
export default function MilestoneCardSummary({
  startDate,
  endDate,
  onChangeDate,
}: MilestoneCardSummaryProps) {
  return (
    <div className="flex flex-col gap-16px">
      <MilestoneStartDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDate("startDate")}
      />
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
