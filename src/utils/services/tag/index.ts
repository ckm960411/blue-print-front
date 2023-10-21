import { patch, post } from "@/app/api/axios";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";

export const createTag = async (createTagReqDto: CreateTagReqDto) => {
  return await post(`tag`, createTagReqDto);
};

export const updateTag = async (
  tagId: number,
  updateTagReqDto: Partial<CreateTagReqDto>,
) => {
  return await patch(`tag/${tagId}`, updateTagReqDto);
};
