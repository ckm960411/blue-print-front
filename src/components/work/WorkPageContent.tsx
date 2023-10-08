import React from "react";
import WorkSideContent from "@/components/work/WorkSideContent";

interface WorkPageContentProps {}
export default function WorkPageContent({}: WorkPageContentProps) {
  return (
    <div className="flex grow">
      <div className="w-400px flex-shrink-0 border-r border-gray-200">
        <WorkSideContent />
      </div>
      <div className="grow">WorkMainContent</div>
    </div>
  );
}
