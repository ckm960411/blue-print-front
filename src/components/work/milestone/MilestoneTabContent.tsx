import { Progress } from "@/utils/types";

interface MilestoneTabContentProps {
  progressChecked: Record<Progress, boolean>;
}
export default function MilestoneTabContent({
  progressChecked,
}: Readonly<MilestoneTabContentProps>) {
  return (
    <div className="mt-16px grid grid-cols-3 gap-16px">
      <div className="col-span-1 bg-blue-50">1</div>
      <div className="col-span-2 bg-red-50">2</div>
    </div>
  );
}
