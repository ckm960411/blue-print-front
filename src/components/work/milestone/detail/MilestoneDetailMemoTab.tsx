"use client";

import React from "react";
import { TabPanel } from "@chakra-ui/tabs";
import { Milestone } from "@/utils/types/milestone";
import MilestoneDetailMemoTabHeader from "@/components/work/milestone/detail/MilestoneDetailMemoTabHeader";
import MilestoneDetailMemoContainer from "@/components/work/milestone/detail/MilestoneDetailMemoContainer";

interface MilestoneDrawerMemoTabProps {
  milestone: Milestone;
}
export default function MilestoneDetailMemoTab({
  milestone,
}: MilestoneDrawerMemoTabProps) {
  return (
    <TabPanel className="flex flex-col gap-16px">
      <MilestoneDetailMemoTabHeader milestone={milestone} />
      <MilestoneDetailMemoContainer milestoneId={milestone.id} />
    </TabPanel>
  );
}
