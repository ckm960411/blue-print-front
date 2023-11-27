import React from "react";
import { TabPanel } from "@chakra-ui/tabs";

import { Milestone } from "@/utils/types/milestone";
import MilestoneDetailTaskContainer from "@/components/work/milestone/detail/MilestoneDetailTaskContainer";
import MilestoneDetailTaskTabButtonGroup from "@/components/work/milestone/detail/MilestoneDetailTaskTabButtonGroup";

interface MilestoneDrawerTaskTabProps {
  milestone: Milestone;
}
export default function MilestoneDetailTaskTab({
  milestone,
}: Readonly<MilestoneDrawerTaskTabProps>) {
  return (
    <TabPanel className="overflow-y-scroll">
      <MilestoneDetailTaskTabButtonGroup milestone={milestone} />
      <MilestoneDetailTaskContainer milestoneId={milestone.id} />
    </TabPanel>
  );
}
