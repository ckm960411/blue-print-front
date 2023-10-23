import TaskContainer from "@/components/work/TaskContainer";
import { Milestone } from "@/utils/types/milestone";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import DrawerTaskTabButtonGroup from "@/components/work/project-plan/sidetab/task/DrawerTaskTabButtonGroup";

interface MilestoneDrawerTaskTabProps {
  milestone: Milestone;
}
export default function MilestoneDrawerTaskTab({
  milestone,
}: MilestoneDrawerTaskTabProps) {
  return (
    <TabPanel className="overflow-y-scroll">
      <DrawerTaskTabButtonGroup milestone={milestone} />
      <TaskContainer />
    </TabPanel>
  );
}
