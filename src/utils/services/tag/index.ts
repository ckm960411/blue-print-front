import { post } from "@/app/api/axios";
import { CreateTagReqDto } from "@/utils/services/tag/dto/create-tag.req.dto";

export const createTag = async (createTagReqDto: CreateTagReqDto) => {
  return await post(`tag`, createTagReqDto);
};
