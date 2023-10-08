import React from "react";
import WorkPageHeader from "@/components/work/WorkPageHeader";
import WorkTabs from "@/components/work/WorkTabs";
import WorkPageContent from "@/components/work/WorkPageContent";

export default function WorkPage() {
  return (
    <div className="h-full bg-gray-50 p-0px sm:p-16px">
      <div className="mx-auto flex h-full max-w-screen-xl flex-col rounded-10px bg-white">
        <WorkPageHeader />
        <WorkPageContent />
      </div>
    </div>
  );
}
