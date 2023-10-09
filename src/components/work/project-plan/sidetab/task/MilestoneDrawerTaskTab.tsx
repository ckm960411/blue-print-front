import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import DrawerTaskTabButtonGroup from "@/components/work/project-plan/sidetab/task/DrawerTaskTabButtonGroup";
import DrawerTodoContainer from "@/components/work/project-plan/sidetab/task/DrawerTodoContainer";

interface MilestoneDrawerTaskTabProps {}
export default function MilestoneDrawerTaskTab({}: MilestoneDrawerTaskTabProps) {
  return (
    <TabPanel className="overflow-y-scroll">
      <DrawerTaskTabButtonGroup />
      <DrawerTodoContainer />
    </TabPanel>
  );
}
