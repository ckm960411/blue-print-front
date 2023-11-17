import { Milestone } from "@/utils/types/milestone";

interface MilestoneListProps {
  milestones: Milestone[];
}
export default function MilestoneList({
  milestones,
}: Readonly<MilestoneListProps>) {
  return (
    <div>
      {milestones.map((milestone) => (
        <div key={milestone.id}>{milestone.title}</div>
      ))}
    </div>
  );
}
