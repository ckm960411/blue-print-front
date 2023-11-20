import { WorkTab } from "@/app/work/page";
import MemoTab from "@/components/work/memo/MemoTab";
import MilestoneTab from "@/components/work/milestone/MilestoneTab";
import TaskTab from "@/components/work/task/TaskTab";
import React from "react";

interface WorkTabsProps {
  workTab: WorkTab;
}
export default function WorkTabs({ workTab }: Readonly<WorkTabsProps>) {
  return (
    <div className="mx-auto max-w-[1280px]">
      {workTab === WorkTab.Milestone && <MilestoneTab />}
      {workTab === WorkTab.Task && <TaskTab />}
      {workTab === WorkTab.Memo && <MemoTab />}
    </div>
  );
}
