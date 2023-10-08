import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import MilestoneDrawerBoardTab from "@/components/work/project-plan/MilestoneDrawerBoardTab";
import MilestoneDrawerTaskTab from "@/components/work/project-plan/MilestoneDrawerTaskTab";
import MilestoneDrawerMemoTab from "@/components/work/project-plan/MilestoneDrawerMemoTab";

interface MilestoneDrawerTabsProps {}
export default function MilestoneDrawerTabs({}: MilestoneDrawerTabsProps) {
  return (
    <Tabs id="work-project-tabs" variant="enclosed" className="grow">
      <TabList>
        <Tab>Board</Tab>
        <Tab>Task</Tab>
        <Tab>Memo</Tab>
      </TabList>

      <TabPanels>
        <MilestoneDrawerBoardTab />
        <MilestoneDrawerTaskTab />
        <MilestoneDrawerMemoTab />
      </TabPanels>
    </Tabs>
  );
}
