"use client";

import MilestoneDrawerMemoTabHeader from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTabHeader";
import WorkSideMemoContainer from "@/components/work/side/WorkSideMemoContainer";
import { Milestone } from "@/utils/types/milestone";
import { TabPanel } from "@chakra-ui/tabs";
import React, { useState } from "react";

interface MilestoneDrawerMemoTabProps {
  milestone: Milestone;
}
export default function MilestoneDrawerMemoTab({
  milestone,
}: MilestoneDrawerMemoTabProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <TabPanel className="flex flex-col gap-16px">
      <MilestoneDrawerMemoTabHeader
        milestone={milestone}
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <WorkSideMemoContainer
        milestoneId={milestone.id}
        showChecked={showChecked}
      />
    </TabPanel>
  );
}
