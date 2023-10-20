import TaskContainer from "@/components/work/TaskContainer";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import DrawerTaskTabButtonGroup from "@/components/work/project-plan/sidetab/task/DrawerTaskTabButtonGroup";

interface MilestoneDrawerTaskTabProps {}
export default function MilestoneDrawerTaskTab({}: MilestoneDrawerTaskTabProps) {
  return (
    <TabPanel className="overflow-y-scroll">
      <DrawerTaskTabButtonGroup />
      <TaskContainer />
    </TabPanel>
  );
}
