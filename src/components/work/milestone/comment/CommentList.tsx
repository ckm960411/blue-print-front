import CommentCard from "@/components/work/milestone/comment/CommentCard";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllComments } from "@/utils/services/comment";
import { useQuery } from "react-query";
import React from "react";

interface CommentListProps {
  milestoneId: number;
  showChecked: boolean;
}
export default function CommentList({
  milestoneId,
  showChecked,
}: CommentListProps) {
  const { data: comments = [] } = useQuery(
    QueryKeys.getAllComments(milestoneId, showChecked),
    () => getAllComments(milestoneId, showChecked),
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
