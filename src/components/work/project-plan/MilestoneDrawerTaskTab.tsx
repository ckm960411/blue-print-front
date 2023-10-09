import { TabPanel } from "@chakra-ui/tabs";
import React from "react";
import DrawerTaskTabButtonGroup from "@/components/work/project-plan/DrawerTaskTabButtonGroup";
import DrawerTodoContainer from "@/components/work/project-plan/DrawerTodoContainer";

interface MilestoneDrawerTaskTabProps {}
export default function MilestoneDrawerTaskTab({}: MilestoneDrawerTaskTabProps) {
  return (
    <TabPanel>
      <DrawerTaskTabButtonGroup />
      <DrawerTodoContainer />
    </TabPanel>
  );
}
