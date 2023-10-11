import AddMilestoneButton from "@/components/work/project-plan/AddMilestoneButton";
import MilestoneDropdown from "@/components/work/project-plan/MilestoneDropdown";

interface ProjectPlanButtonsProps {}
export default function ProjectPlanButtons({}: ProjectPlanButtonsProps) {
  return (
    <div className="flex-center gap-8px">
      <MilestoneDropdown />
      <AddMilestoneButton />
    </div>
  );
}
