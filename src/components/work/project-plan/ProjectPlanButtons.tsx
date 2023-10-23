import AddMilestoneButton from "@/components/work/project-plan/AddMilestoneButton";
import MilestoneDropdown from "@/components/work/project-plan/MilestoneDropdown";
import { MilestoneStatus } from "@/components/work/project-plan/ProjectPlanTab";
import { Dispatch, SetStateAction } from "react";

interface ProjectPlanButtonsProps {
  status: MilestoneStatus;
  setStatus: Dispatch<SetStateAction<MilestoneStatus>>;
}
export default function ProjectPlanButtons({
  status,
  setStatus,
}: ProjectPlanButtonsProps) {
  return (
    <div className="flex-center gap-8px">
      <MilestoneDropdown status={status} setStatus={setStatus} />
      <AddMilestoneButton />
    </div>
  );
}
