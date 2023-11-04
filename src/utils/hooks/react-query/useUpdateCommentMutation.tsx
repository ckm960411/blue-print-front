import { QueryKeys } from "@/utils/common/query-keys";
import { updateComment } from "@/utils/services/comment";
import { UpdateCommentReqDto } from "@/utils/services/comment/dto/update-comment.req.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCommentMutation = (
  commentId: number,
  options?: {
    onSuccess?: () => void;
    onError?: (e?: any) => void;
  },
) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    ["update-comment"],
    (updateCommentReqDto: UpdateCommentReqDto) =>
      updateComment(commentId, updateCommentReqDto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getAllComments());
        options?.onSuccess?.();
      },
      onError: (e: any) => {
        console.error(e);
        options?.onError?.(e);
      },
    },
  );

  return mutationResult;
};
