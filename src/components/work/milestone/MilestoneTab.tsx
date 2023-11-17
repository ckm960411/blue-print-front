import MilestoneTabCheckboxContainer from "@/components/work/milestone/MilestoneTabCheckboxContainer";
import MilestoneTabContent from "@/components/work/milestone/MilestoneTabContent";

export default function MilestoneTab() {
  return (
    <div>
      <div>
        <MilestoneTabCheckboxContainer />
      </div>
      <MilestoneTabContent />
    </div>
  );
}
