import MilestoneDrawerMemoTabHeader from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTabHeader";
import MemoCard from "@/components/work/components/MemoCard";
import WorkSideMemoHeader from "@/components/work/side/WorkSideMemoHeader";
import React, { useState } from "react";

interface WorkSideMemoProps {}
export default function WorkSideMemo({}: WorkSideMemoProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <div className="flex flex-col gap-16px">
      <WorkSideMemoHeader
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <div className="flex flex-col gap-16px">
        <MemoCard isBookmarked theme="green" />
        <MemoCard isChecked theme="blue" />
        <MemoCard />
      </div>
    </div>
  );
}
