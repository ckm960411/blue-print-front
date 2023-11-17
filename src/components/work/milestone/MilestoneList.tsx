import React, { Dispatch, SetStateAction } from "react";
import { Milestone } from "@/utils/types/milestone";
import MilestoneListCard from "@/components/work/milestone/MilestoneListCard";

interface MilestoneListProps {
  milestones: Milestone[];
  currentMilestone: Milestone | null;
  setCurrentMilestone: Dispatch<SetStateAction<Milestone | null>>;
}
export default function MilestoneList({
  milestones,
  currentMilestone,
  setCurrentMilestone,
}: Readonly<MilestoneListProps>) {
  return (
    <div className="flex flex-col gap-8px">
      {milestones.map((milestone) => (
        <MilestoneListCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
