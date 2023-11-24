import { deleteCall, patch, post } from "@/app/api/axios";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";
import { Tag } from "@/utils/types/tag.index";

export const createTag = async (createTagReqDto: CreateTagReqDto) => {
  const { data } = await post<Tag>(`tag`, createTagReqDto);
  return data;
};

export const updateTag = async (
  tagId: number,
  updateTagReqDto: Partial<CreateTagReqDto>,
) => {
  const { data } = await patch<Tag>(`tag/${tagId}`, updateTagReqDto);
  return data;
};

export const deleteTag = async (id: number) => {
  return await deleteCall(`tag/${id}`);
};
