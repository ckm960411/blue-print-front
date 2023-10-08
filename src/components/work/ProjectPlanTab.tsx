import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import ProjectMilestoneEmoji from "@/components/work/ProjectMilestoneEmoji";

interface ProjectPlanTabProps {}
export default function ProjectPlanTab({}: ProjectPlanTabProps) {
  return (
    <TabPanel>
      <p className="text-22px font-bold">Milestone</p>
      <hr className="my-16px" />
      <div>
        <div className="rounded-10px border border-gray-200 p-16px">
          <div className="flex items-center gap-8px">
            <ProjectMilestoneEmoji />
            <p className="text-16px font-medium text-gray-700">마일스톤 이름</p>
          </div>
        </div>
      </div>
    </TabPanel>
  );
}
