import { Milestone } from "@/utils/types/milestone";

interface MilestoneDetailProps {
  currentMilestone: Milestone | null;
}
export default function MilestoneDetail({
  currentMilestone,
}: Readonly<MilestoneDetailProps>) {
  return <div>MilestoneDetail</div>;
}
