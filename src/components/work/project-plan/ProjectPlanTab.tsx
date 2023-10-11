import React from "react";
import { TabPanel } from "@chakra-ui/tabs";
import ProjectPlanTabHeader from "@/components/work/project-plan/ProjectPlanTabHeader";
import MilestoneCard from "@/components/work/project-plan/MilestoneCard";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  return (
    <TabPanel>
      <ProjectPlanTabHeader />

      <hr className="my-16px" />

      <div className="flex flex-col gap-16px">
        <MilestoneCard openContent={true} />
        <MilestoneCard openContent={false} />
      </div>
    </TabPanel>
  );
}
