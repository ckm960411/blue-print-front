import MilestoneTabCheckboxContainer from "@/components/work/milestone/MilestoneTabCheckboxContainer";
import MilestoneTabContent from "@/components/work/milestone/MilestoneTabContent";
import { WEB_STORAGE_KEY } from "@/utils/common/constant";
import { useLocalStorage } from "@/utils/hooks/common/useLocalStorage";
import { Progress } from "@/utils/types";
import { useMountEffect } from "primereact/hooks";
import { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

export type ProgressChecked = Record<Progress, boolean>;
const initialProgressChecked = {
  [Progress.ToDo]: true,
  [Progress.InProgress]: false,
  [Progress.Review]: false,
  [Progress.Completed]: false,
};

export default function MilestoneTab() {
  const [localProgressChecked, setLocalProgressProgressChecked] =
    useLocalStorage(
      WEB_STORAGE_KEY.MILESTONE_PROGRESS_CHECKED,
      initialProgressChecked,
    );
  const [progressChecked, setProgressChecked] = useState<ProgressChecked>(
    initialProgressChecked,
  );

  useMountEffect(() => {
    setProgressChecked(localProgressChecked);
  });
  useUpdateEffect(() => {
    setLocalProgressProgressChecked(progressChecked);
  }, [progressChecked]);

  return (
    <div className="py-16px pl-16px pr-12px">
      <MilestoneTabCheckboxContainer
        progressChecked={progressChecked}
        setProgressChecked={setProgressChecked}
      />
      <MilestoneTabContent progressChecked={progressChecked} />
    </div>
  );
}
