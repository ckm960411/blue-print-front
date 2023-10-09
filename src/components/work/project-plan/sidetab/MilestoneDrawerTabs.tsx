import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import MilestoneDrawerBoardTab from "@/components/work/project-plan/sidetab/MilestoneDrawerBoardTab";
import MilestoneDrawerTaskTab from "@/components/work/project-plan/sidetab/task/MilestoneDrawerTaskTab";
import MilestoneDrawerMemoTab from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTab";

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
