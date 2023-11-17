import React from "react";
import { Milestone } from "@/utils/types/milestone";
import MilestoneListCard from "@/components/work/milestone/MilestoneListCard";

interface MilestoneListProps {
  milestones: Milestone[];
}
export default function MilestoneList({
  milestones,
}: Readonly<MilestoneListProps>) {
  return (
    <div className="flex flex-col gap-8px">
      {milestones.map((milestone) => (
        <MilestoneListCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
