import MilestoneMemo from "@/components/work/project-plan/sidetab/MilestoneMemo";
import { TabPanel } from "@chakra-ui/tabs";
import React from "react";

interface MilestoneDrawerMemoTabProps {}
export default function MilestoneDrawerMemoTab({}: MilestoneDrawerMemoTabProps) {
  return (
    <TabPanel>
      <div className="flex flex-col gap-16px">
        <MilestoneMemo />
        <MilestoneMemo />
        <MilestoneMemo />
      </div>
    </TabPanel>
  );
}
