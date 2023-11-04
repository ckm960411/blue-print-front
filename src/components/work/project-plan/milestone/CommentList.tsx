import { getAllComments } from "@/utils/services/comment";
import { useQuery } from "@tanstack/react-query";

interface CommentListProps {
  milestoneId: number;
}
export default function CommentList({ milestoneId }: CommentListProps) {
  const { data: comments } = useQuery(
    ["get-all-comments", milestoneId],
    () => getAllComments(milestoneId),
    { onError: console.error },
  );

  return <div>CommentList</div>;
}
