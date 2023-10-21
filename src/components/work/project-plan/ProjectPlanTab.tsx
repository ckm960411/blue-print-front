import MilestoneContainer from "@/components/work/project-plan/MilestoneContainer";
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

      <MilestoneContainer />
    </TabPanel>
  );
}
