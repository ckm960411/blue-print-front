import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import MilestoneCard from "@/components/work/project-plan/MilestoneCard";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  return (
    <TabPanel>
      <p className="text-22px font-bold">Milestone</p>

      <hr className="my-16px" />

      <div className="flex flex-col gap-16px">
        <MilestoneCard openContent={true} />
        <MilestoneCard openContent={false} />
      </div>
    </TabPanel>
  );
}
