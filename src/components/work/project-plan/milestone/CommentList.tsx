import CommentCard from "@/components/work/project-plan/milestone/CommentCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllComments } from "@/utils/services/comment";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface CommentListProps {
  milestoneId: number;
}
export default function CommentList({ milestoneId }: CommentListProps) {
  const { data: comments = [] } = useQuery(
    QueryKeys.getAllComments(milestoneId),
    () => getAllComments(milestoneId),
    { onError: console.error },
  );

  return (
    <div className="flex flex-col gap-16px">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
