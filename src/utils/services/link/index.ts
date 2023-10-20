import { deleteCall, post } from "@/app/api/axios";
import { CreateLinkReqDto } from "@/utils/services/link/dto/create-link.req.dto";

export const createLink = async (createLinkReqDto: CreateLinkReqDto) => {
  return await post(`link`, createLinkReqDto);
};

export const deleteLinkById = async (id: number) => {
  return await deleteCall(`link/${id}`);
};
