import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs";
import DashBoardTab from "@/components/work/DashBoardTab";
import ProjectPlanTab from "@/components/work/project-plan/ProjectPlanTab";
import TaskListTab from "@/components/work/TaskListTab";
import React from "react";

interface MilestoneDrawerTabsProps {}
export default function MilestoneDrawerTabs({}: MilestoneDrawerTabsProps) {
  return (
    <Tabs id="work-project-tabs" variant="enclosed" className="grow">
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Project Plan</Tab>
        <Tab>Task List</Tab>
      </TabList>

      <TabPanels>
        <DashBoardTab />
        <ProjectPlanTab />
        <TaskListTab />
      </TabPanels>
    </Tabs>
  );
}
