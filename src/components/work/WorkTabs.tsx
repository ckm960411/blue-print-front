import { WorkTab } from "@/app/work/page";
import MilestoneTab from "@/components/work/milestone/MilestoneTab";
import React from "react";

interface WorkTabsProps {
  workTab: WorkTab;
}
export default function WorkTabs({ workTab }: Readonly<WorkTabsProps>) {
  return (
    <div className="mx-auto max-w-[1280px] p-16px">
      {workTab === WorkTab.Milestone && <MilestoneTab />}
      {workTab === WorkTab.Task && <div>Task Tab</div>}
      {workTab === WorkTab.Memo && <div>Memo Tab</div>}
    </div>
  );
}
