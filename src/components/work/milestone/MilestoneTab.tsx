import MilestoneTabCheckboxContainer from "@/components/work/milestone/MilestoneTabCheckboxContainer";

export default function MilestoneTab() {
  return (
    <div>
      <div>
        <MilestoneTabCheckboxContainer />
      </div>
      <div className="mt-16px grid grid-cols-3 gap-16px">
        <div className="col-span-1 bg-blue-50">1</div>
        <div className="col-span-2 bg-red-50">2</div>
      </div>
    </div>
  );
}
