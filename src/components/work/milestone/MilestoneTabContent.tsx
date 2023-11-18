import { useState } from "react";

import MilestoneDetail from "@/components/work/milestone/MilestoneDetail";
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
    <div className="mt-16px grid grid-cols-3 gap-12px">
      <div className="col-span-1 max-h-[720px] overflow-y-auto">
        <MilestoneList
          currentMilestoneId={currentMilestoneId}
          setCurrentMilestoneId={setCurrentMilestoneId}
          progressChecked={progressChecked}
        />
      </div>
      <div className="col-span-2 min-h-[720px] overflow-y-auto px-4px pb-4px">
        {currentMilestoneId && (
          <MilestoneDetail milestoneId={currentMilestoneId} />
        )}
      </div>
    </div>
  );
}
