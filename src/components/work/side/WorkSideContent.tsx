"use client";

import SpaceY from "@/components/common/SpaceY";
import WorkSideCalendar from "@/components/work/side/WorkSideCalendar";
import WorkSideContentIcons from "@/components/work/side/WorkSideContentIcons";
import WorkSideMemo from "@/components/work/side/WorkSideMemo";
import WorkSideProjectOutline from "@/components/work/side/WorkSideProjectOutline";
import { useEffect, useState } from "react";
import { WorkSideContentType } from "@/utils/types/work";
import { useMediaQuery } from "react-responsive";

interface WorkSideContentProps {}
export default function WorkSideContent({}: WorkSideContentProps) {
  const { OUTLINE, CALENDAR, MEMO } = WorkSideContentType;

  const UNDER_840PX = useMediaQuery({ query: "(max-width: 839px)" });
  const [openSideTab, setOpenSideTab] = useState(true);
  const [contentType, setContentType] = useState<WorkSideContentType>(
    WorkSideContentType.OUTLINE,
  );

  useEffect(() => {
    if (!UNDER_840PX) {
      setOpenSideTab(true);
    }
  }, [UNDER_840PX]);

  return (
    <div>
      <WorkSideContentIcons
        contentType={contentType}
        setContentType={setContentType}
      />

      <div className="relative px-16px">
        {UNDER_840PX && (
          <button
            onClick={() => setOpenSideTab((prev) => !prev)}
            className="absolute -top-32px right-16px rounded-md bg-gray-50 px-8px py-6px text-14px text-gray-600"
          >
            {openSideTab ? "닫기" : "펼치기"}
          </button>
        )}
        <div className={openSideTab ? "h-auto" : "h-0px overflow-hidden"}>
          {contentType === OUTLINE && <WorkSideProjectOutline />}
          {contentType === CALENDAR && <WorkSideCalendar />}
          {contentType === MEMO && <WorkSideMemo />}
        </div>
        <SpaceY height={openSideTab ? 32 : 0} />
      </div>
    </div>
  );
}
