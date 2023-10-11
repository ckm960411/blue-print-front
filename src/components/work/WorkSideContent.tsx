"use client";

import WorkSideContentIcons from "@/components/work/WorkSideContentIcons";
import WorkSideMemo from "@/components/work/WorkSideMemo";
import WorkSideProjectOutline from "@/components/work/WorkSideProjectOutline";
import { useState } from "react";
import { WorkSideContentType } from "@/utils/types/work";

interface WorkSideContentProps {}
export default function WorkSideContent({}: WorkSideContentProps) {
  const { OUTLINE, CALENDAR, MEMO } = WorkSideContentType;

  const [contentType, setContentType] = useState<WorkSideContentType>(
    WorkSideContentType.OUTLINE,
  );

  return (
    <div>
      <WorkSideContentIcons
        contentType={contentType}
        setContentType={setContentType}
      />

      <div className="px-16px">
        {contentType === OUTLINE && <WorkSideProjectOutline />}
        {contentType === CALENDAR && <div>CALENDAR</div>}
        {contentType === MEMO && <WorkSideMemo />}
      </div>
    </div>
  );
}
