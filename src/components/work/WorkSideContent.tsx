"use client";

import WorkSideContentIcons from "@/components/work/WorkSideContentIcons";
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

      <div>
        {contentType === OUTLINE && <WorkSideProjectOutline />}
        {contentType === CALENDAR && <div>CALENDAR</div>}
        {contentType === MEMO && <div>MEMO</div>}
      </div>
    </div>
  );
}
