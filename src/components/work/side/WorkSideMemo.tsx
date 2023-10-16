import MilestoneDrawerMemoTabHeader from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTabHeader";
import MilestoneMemo from "@/components/work/project-plan/sidetab/MilestoneMemo";
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
        <MilestoneMemo isBookmarked theme="green" />
        <MilestoneMemo isChecked theme="blue" />
        <MilestoneMemo />
      </div>
    </div>
  );
}
