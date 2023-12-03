import { useState } from "react";

import MilestoneDetail from "@/components/work/milestone/detail/MilestoneDetail";
import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";

interface MilestoneTabContentProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
  const [currentMilestoneId, setCurrentMilestoneId] = useState<number | null>(
    null,
  );

  return (
    <div className="mt-16px gap-12px sm:grid sm:grid-cols-3">
      <div className="col-span-1">
        <MilestoneList
          currentMilestoneId={currentMilestoneId}
          setCurrentMilestoneId={setCurrentMilestoneId}
          progressChecked={progressChecked}
        />
      </div>
      <div className="hidden px-4px pb-4px sm:col-span-2 sm:block">
        {currentMilestoneId && (
          <MilestoneDetail milestoneId={currentMilestoneId} />
        )}
      </div>
    </div>
  );
}
