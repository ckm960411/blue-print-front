import React, { Dispatch, SetStateAction } from "react";
import { Milestone } from "@/utils/types/milestone";
import MilestoneListCard from "@/components/work/milestone/MilestoneListCard";

interface MilestoneListProps {
  milestones: Milestone[];
  currentMilestoneId: number | null;
  setCurrentMilestoneId: Dispatch<SetStateAction<number | null>>;
}
export default function MilestoneList({
  milestones,
  currentMilestoneId,
  setCurrentMilestoneId,
}: Readonly<MilestoneListProps>) {
  return (
    <div className="flex flex-col gap-8px">
      {milestones.map((milestone) => (
        <MilestoneListCard
          key={milestone.id}
          milestone={milestone}
          isActive={milestone.id === currentMilestoneId}
          onClick={() => setCurrentMilestoneId(milestone.id)}
        />
      ))}
    </div>
  );
}
