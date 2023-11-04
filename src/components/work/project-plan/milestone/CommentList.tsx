import CommentBookmarkButton from "@/components/work/project-plan/milestone/CommentBookmarkButton";
import { QueryKeys } from "@/utils/common/query-keys";
import { getAllComments } from "@/utils/services/comment";
import { useQuery } from "@tanstack/react-query";

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
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative rounded-10px border border-gray-200 p-16px duration-200 hover:shadow-md"
        >
          <CommentBookmarkButton
            commentId={comment.id}
            isBookmarked={comment.isBookmarked}
          />
          <div
            dangerouslySetInnerHTML={{ __html: comment.content }}
            className="break-all text-14px leading-[140%] text-gray-800"
          />
        </div>
      ))}
    </div>
  );
}
