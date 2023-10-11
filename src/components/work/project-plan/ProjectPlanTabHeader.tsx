import ProjectPlanButtons from "@/components/work/project-plan/ProjectPlanButtons";
import React from "react";

interface ProjectPlanTabHeaderProps {}
export default function ProjectPlanTabHeader({}: ProjectPlanTabHeaderProps) {
  return (
    <div className="flex-between">
      <p className="text-22px font-bold">Milestone</p>
      <ProjectPlanButtons />
    </div>
  );
}
