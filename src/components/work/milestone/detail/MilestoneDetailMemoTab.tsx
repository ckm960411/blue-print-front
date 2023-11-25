"use client";

import MilestoneDetailMemoTabHeader from "@/components/work/milestone/detail/MilestoneDetailMemoTabHeader";
import MilestoneDetailMemoContainer from "@/components/work/milestone/detail/MilestoneDetailMemoContainer";
import { Milestone } from "@/utils/types/milestone";
import { TabPanel } from "@chakra-ui/tabs";
import React, { useState } from "react";

interface MilestoneDrawerMemoTabProps {
  milestone: Milestone;
}
export default function MilestoneDetailMemoTab({
  milestone,
}: MilestoneDrawerMemoTabProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <TabPanel className="flex flex-col gap-16px">
      <MilestoneDetailMemoTabHeader
        milestone={milestone}
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <MilestoneDetailMemoContainer
        milestoneId={milestone.id}
        showChecked={showChecked}
      />
    </TabPanel>
  );
}
