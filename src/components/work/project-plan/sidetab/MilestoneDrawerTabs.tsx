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
}: Readonly<MilestoneDrawerTabsProps>) {
  return (
    <Tabs id="work-project-tabs" variant="enclosed">
      <TabList>
        <Tab className="text-14px font-medium">Board</Tab>
        <Tab className="text-14px font-medium">Task</Tab>
        <Tab className="text-14px font-medium">Memo</Tab>
      </TabList>

      <TabPanels>
        <MilestoneDrawerBoardTab milestone={milestone} />
        <MilestoneDrawerTaskTab milestone={milestone} />
        <MilestoneDrawerMemoTab milestone={milestone} />
      </TabPanels>
    </Tabs>
  );
}
