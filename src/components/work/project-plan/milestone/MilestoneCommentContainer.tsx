import CommentList from "@/components/work/project-plan/milestone/CommentList";
import CreateCommentForm from "@/components/work/project-plan/milestone/CreateCommentForm";
import { Milestone } from "@/utils/types/milestone";

interface MilestoneCommentContainerProps {
  milestone: Milestone;
}
export default function MilestoneCommentContainer({
  milestone,
}: Readonly<MilestoneCommentContainerProps>) {
  return (
    <div>
      <CreateCommentForm />
      <CommentList />
    </div>
  );
}
