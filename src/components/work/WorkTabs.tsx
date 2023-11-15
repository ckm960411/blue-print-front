import { WorkTab } from "@/app/work/page";
import React from "react";

interface WorkTabsProps {
  workTab: WorkTab;
}
export default function WorkTabs({ workTab }: Readonly<WorkTabsProps>) {
  return (
    <div className="mx-auto max-w-[1280px] p-16px">
      {workTab === WorkTab.Milestone && <div>Milestone Tab</div>}
      {workTab === WorkTab.Task && <div>Task Tab</div>}
      {workTab === WorkTab.Memo && <div>Memo Tab</div>}
    </div>
  );
}
