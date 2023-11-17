import MilestoneTabCheckboxContainer from "@/components/work/milestone/MilestoneTabCheckboxContainer";
import MilestoneTabContent from "@/components/work/milestone/MilestoneTabContent";
import { Progress } from "@/utils/types";
import { useState } from "react";

export default function MilestoneTab() {
  const [progressChecked, setProgressChecked] = useState<
    Record<Progress, boolean>
  >({
    [Progress.ToDo]: true,
    [Progress.InProgress]: false,
    [Progress.Review]: false,
    [Progress.Completed]: false,
  });

  return (
    <div>
      <MilestoneTabCheckboxContainer
        progressChecked={progressChecked}
        setProgressChecked={setProgressChecked}
      />
      <MilestoneTabContent progressChecked={progressChecked} />
    </div>
  );
}
