import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import MilestoneCard from "@/components/work/MilestoneCard";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  return (
    <TabPanel>
      <p className="text-22px font-bold">Milestone</p>

      <hr className="my-16px" />

      <div>
        <MilestoneCard openContent={true} />
      </div>
    </TabPanel>
  );
}
