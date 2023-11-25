import CommentList from "@/components/work/milestone/comment/CommentList";
import CreateCommentForm from "@/components/work/milestone/comment/CreateCommentForm";
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
    <div className="flex flex-col gap-16px">
      <CreateCommentForm
        milestoneId={milestone.id}
        showChecked={showChecked}
        onToggleCheck={() => setShowChecked((prev) => !prev)}
      />
      <CommentList milestoneId={milestone.id} showChecked={showChecked} />
    </div>
  );
}
