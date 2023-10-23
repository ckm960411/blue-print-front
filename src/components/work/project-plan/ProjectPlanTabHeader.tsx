import ProjectPlanButtons from "@/components/work/project-plan/ProjectPlanButtons";
import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import React, { Dispatch, SetStateAction } from "react";

interface ProjectPlanTabHeaderProps {
  status: MilestoneStatus;
  setStatus: Dispatch<SetStateAction<MilestoneStatus>>;
}
export default function ProjectPlanTabHeader({
  status,
  setStatus,
}: ProjectPlanTabHeaderProps) {
  return (
    <div className="flex-between">
      <p className="text-22px font-bold">Milestone</p>
      <ProjectPlanButtons status={status} setStatus={setStatus} />
    </div>
  );
}
