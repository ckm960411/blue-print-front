"use client";

import WorkSideCalendar from "@/components/work/side/WorkSideCalendar";
import WorkSideContentIcons from "@/components/work/side/WorkSideContentIcons";
import WorkSideMemo from "@/components/work/side/WorkSideMemo";
import WorkSideProjectOutline from "@/components/work/side/WorkSideProjectOutline";
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
        {contentType === CALENDAR && <WorkSideCalendar />}
        {contentType === MEMO && <WorkSideMemo />}
      </div>
    </div>
  );
}
