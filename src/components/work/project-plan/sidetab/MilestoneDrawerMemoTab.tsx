"use client";

import MilestoneDrawerMemoTabHeader from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTabHeader";
import MilestoneMemo from "@/components/work/project-plan/sidetab/MilestoneMemo";
import { TabPanel } from "@chakra-ui/tabs";
import React, { useState } from "react";

interface MilestoneDrawerMemoTabProps {}
export default function MilestoneDrawerMemoTab({}: MilestoneDrawerMemoTabProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <TabPanel className="flex flex-col gap-16px">
      <MilestoneDrawerMemoTabHeader
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <div className="flex flex-col gap-16px">
        <MilestoneMemo />
        <MilestoneMemo />
        <MilestoneMemo />
      </div>
    </TabPanel>
  );
}
