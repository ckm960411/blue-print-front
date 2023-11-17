import { Milestone } from "@/utils/types/milestone";

interface MilestoneDetailProps {
  milestone: Milestone | null;
}
export default function MilestoneDetail({
  milestone,
}: Readonly<MilestoneDetailProps>) {
  if (!milestone) return <></>;

  return <div>{milestone.title}</div>;
}
