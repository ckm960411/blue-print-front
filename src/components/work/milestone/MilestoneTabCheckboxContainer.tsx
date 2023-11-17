import { Dispatch, SetStateAction } from "react";
import { Progress } from "@/utils/types";
import CheckBox from "@/components/work/components/CheckBox";

interface MilestoneTabCheckboxContainerProps {
  progressChecked: ProgressChecked;
  setProgressChecked: Dispatch<SetStateAction<ProgressChecked>>;
}
export default function MilestoneTabCheckboxContainer({
  progressChecked,
  setProgressChecked,
}: Readonly<MilestoneTabCheckboxContainerProps>) {
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
