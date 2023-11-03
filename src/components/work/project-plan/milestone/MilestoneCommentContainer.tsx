import CommentList from "@/components/work/project-plan/milestone/CommentList";
import CreateCommentForm from "@/components/work/project-plan/milestone/CreateCommentForm";
import { Milestone } from "@/utils/types/milestone";
import { useState } from "react";

interface MilestoneCommentContainerProps {
  milestone: Milestone;
}
export default function MilestoneCommentContainer({
  milestone,
}: Readonly<MilestoneCommentContainerProps>) {
  const [showChecked, setShowChecked] = useState(false);

  return (
    <div>
      <CreateCommentForm
        milestoneId={milestone.id}
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />
      <CommentList />
    </div>
  );
}
