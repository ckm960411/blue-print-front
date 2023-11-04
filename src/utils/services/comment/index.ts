import { deleteCall, get, patch, post } from "@/app/api/axios";
import { CreateCommentReqDto } from "@/utils/services/comment/dto/create-comment.req.dto";
import { UpdateCommentReqDto } from "@/utils/services/comment/dto/update-comment.req.dto";
import { Comment } from "@/utils/types/comment";
export const createComment = async (
  createCommentReqDto: CreateCommentReqDto,
) => {
  const { data } = await post<Comment>(`comment`, createCommentReqDto);
  return data;
};

export const getAllComments = async (milestoneId: number) => {
  const { data } = await get<Comment[]>(`comment`, { params: { milestoneId } });
  return data;
};

export const updateComment = async (
  id: number,
  updateCommentReqDto: UpdateCommentReqDto,
) => {
  const { data } = await patch<Comment>(`comment/${id}`, updateCommentReqDto);
  return data;
};

export const deleteComment = async (id: number) => {
  await deleteCall(`comment/${id}`);
};
