"use client";

import { projectState } from "@/utils/recoil/store";
import React from "react";
import WorkSideContent from "@/components/work/side/WorkSideContent";
import WorkTabs from "@/components/work/WorkTabs";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";

interface WorkPageContentProps {}
export default function WorkPageContent({}: WorkPageContentProps) {
  const project = useRecoilValue(projectState);
  const UNDER_840PX = useMediaQuery({ query: "(max-width: 839px)" });

  if (!project) return <></>;

  return (
    <div
      className={`flex grow ${UNDER_840PX ? "flex-col gap-32px" : "flex-row"}`}
    >
      <div
        className={
          UNDER_840PX ? "w-full" : "max-w-[400px] border-r border-gray-200"
        }
      >
        <WorkSideContent />
      </div>
      <div
        className={`grow bg-white ${
          UNDER_840PX ? "" : "relative bottom-42px min-w-[400px]"
        }`}
      >
        <WorkTabs />
      </div>
    </div>
  );
}
