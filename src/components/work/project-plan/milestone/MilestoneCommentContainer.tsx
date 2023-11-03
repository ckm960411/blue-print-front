import { Milestone } from "@/utils/types/milestone";

interface MilestoneCommentContainerProps {
  milestone: Milestone;
}
export default function MilestoneCommentContainer({
  milestone,
}: Readonly<MilestoneCommentContainerProps>) {
  return <div>MilestoneCommentContainer</div>;
}
