import { deleteCall, post } from "@/app/api/axios";
import { CreateLinkReqDto } from "@/utils/services/link/dto/create-link.req.dto";
import { Link } from "@/utils/types";

export const createLink = async (createLinkReqDto: CreateLinkReqDto) => {
  const { data } = await post<Link>(`link`, createLinkReqDto);
  return data;
};

export const deleteLinkById = async (id: number) => {
  const { data } = await deleteCall<Link>(`link/${id}`);
  return data;
};
