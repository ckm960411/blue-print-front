import { Milestone } from "@/utils/types/milestone";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import MilestoneDrawerBoardTab from "@/components/work/project-plan/sidetab/MilestoneDrawerBoardTab";
import MilestoneDrawerTaskTab from "@/components/work/project-plan/sidetab/task/MilestoneDrawerTaskTab";
import MilestoneDrawerMemoTab from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTab";

interface MilestoneDrawerTabsProps {
  milestone: Milestone;
}
export default function MilestoneDrawerTabs({
  milestone,
}: MilestoneDrawerTabsProps) {
  return (
    <Tabs id="work-project-tabs" variant="enclosed">
      <TabList>
        <Tab>Board</Tab>
        <Tab>Task</Tab>
        <Tab>Memo</Tab>
      </TabList>

      <TabPanels>
        <MilestoneDrawerBoardTab />
        <MilestoneDrawerTaskTab milestone={milestone} />
        <MilestoneDrawerMemoTab />
      </TabPanels>
    </Tabs>
  );
}
