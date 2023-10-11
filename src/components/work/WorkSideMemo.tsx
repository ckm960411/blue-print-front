import MilestoneDrawerMemoTabHeader from "@/components/work/project-plan/sidetab/MilestoneDrawerMemoTabHeader";
import MilestoneMemo from "@/components/work/project-plan/sidetab/MilestoneMemo";
import React, { useState } from "react";

interface WorkSideMemoProps {}
export default function WorkSideMemo({}: WorkSideMemoProps) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <div className="flex flex-col gap-16px">
      <MilestoneDrawerMemoTabHeader
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />

      <div className="flex flex-col gap-16px">
        <MilestoneMemo isBookmarked />
        <MilestoneMemo isChecked />
        <MilestoneMemo />
      </div>
    </div>
  );
}
