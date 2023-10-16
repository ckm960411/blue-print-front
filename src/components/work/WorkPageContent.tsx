import React from "react";
import WorkSideContent from "@/components/work/side/WorkSideContent";
import WorkTabs from "@/components/work/WorkTabs";

interface WorkPageContentProps {}
export default function WorkPageContent({}: WorkPageContentProps) {
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
