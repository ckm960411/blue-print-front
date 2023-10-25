"use client";

import { projectState } from "@/utils/recoil/store";
import React from "react";
import WorkSideContent from "@/components/work/side/WorkSideContent";
import WorkTabs from "@/components/work/WorkTabs";
import { useRecoilValue } from "recoil";

interface WorkPageContentProps {}
export default function WorkPageContent({}: WorkPageContentProps) {
  const project = useRecoilValue(projectState);

  if (!project) return <></>;

  return (
    <div className="flex grow">
      <div className="w-400px flex-shrink-0 border-r border-gray-200">
        <WorkSideContent />
      </div>
      <div className="relative bottom-42px grow bg-white">
        <WorkTabs />
      </div>
    </div>
  );
}
