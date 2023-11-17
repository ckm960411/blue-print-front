import CheckBox from "@/components/work/components/CheckBox";
import { Progress } from "@/utils/types";
import { useState } from "react";

export default function MilestoneTabCheckboxContainer() {
  const [progressChecked, setProgressChecked] = useState<
    Record<Progress, boolean>
  >({
    [Progress.ToDo]: true,
    [Progress.InProgress]: false,
    [Progress.Review]: false,
    [Progress.Completed]: false,
  });

  const progressWords = [
    {
      id: Progress.ToDo,
      title: "To Do",
      isChecked: progressChecked[Progress.ToDo],
    },
    {
      id: Progress.InProgress,
      title: "In Progress",
      isChecked: progressChecked[Progress.InProgress],
    },
    {
      id: Progress.Review,
      title: "Review",
      isChecked: progressChecked[Progress.Review],
    },
    {
      id: Progress.Completed,
      title: "Completed",
      isChecked: progressChecked[Progress.Completed],
    },
  ] as const;

  return (
    <div className="flex-center gap-16px">
      {progressWords.map((progress) => (
        <CheckBox
          key={progress.id}
          isChecked={progress.isChecked}
          onClick={() =>
            setProgressChecked((prev) => ({
              ...prev,
              [progress.id]: !prev[progress.id],
            }))
          }
          title={progress.title}
        />
      ))}
    </div>
  );
}
