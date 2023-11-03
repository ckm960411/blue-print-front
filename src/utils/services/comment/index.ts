import { post } from "@/app/api/axios";
import { CreateCommentReqDto } from "@/utils/services/comment/dto/create-comment.req.dto";

export const createComment = async (
  createCommentReqDto: CreateCommentReqDto,
) => {
  const { data } = await post<Comment>(`comment`, createCommentReqDto);
  return data;
};
