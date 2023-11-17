import MilestoneList from "@/components/work/milestone/MilestoneList";
import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";

interface MilestoneTabContentProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
  return (
    <div className="mt-16px grid grid-cols-3 gap-16px">
      <div className="col-span-1 bg-blue-50">
        <MilestoneList progressChecked={progressChecked} />
      </div>
      <div className="col-span-2 bg-red-50">2</div>
    </div>
  );
}
