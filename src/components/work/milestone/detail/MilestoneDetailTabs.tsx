import { Milestone } from "@/utils/types/milestone";
import { Tab, TabList, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import MilestoneDetailBoardTab from "@/components/work/milestone/detail/MilestoneDetailBoardTab";
import MilestoneDetailTaskTab from "@/components/work/milestone/detail/MilestoneDetailTaskTab";
import MilestoneDetailMemoTab from "@/components/work/milestone/detail/MilestoneDetailMemoTab";

interface MilestoneDrawerTabsProps {
  milestone: Milestone;
}
export default function MilestoneDetailTabs({
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
        <MilestoneDetailBoardTab milestone={milestone} />
        <MilestoneDetailTaskTab milestone={milestone} />
        <MilestoneDetailMemoTab milestone={milestone} />
      </TabPanels>
    </Tabs>
  );
}
