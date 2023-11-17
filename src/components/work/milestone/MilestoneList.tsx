import { ProgressChecked } from "@/components/work/milestone/MilestoneTab";

interface MilestoneListProps {
  progressChecked: ProgressChecked;
}
export default function MilestoneList({
  progressChecked,
}: Readonly<MilestoneListProps>) {
  return <div>MilestoneList</div>;
}
