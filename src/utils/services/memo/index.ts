import { deleteCall, get, patch, post } from "@/app/api/axios";
import { CreateMemoReqDto } from "@/utils/services/memo/dto/create-memo.req.dto";
import { Memo } from "@/utils/types/memo";

export interface GetAllMemosReqDto {
  projectId?: number;
  milestoneId?: number;
  checked?: boolean;
}
export const getAllMemos = async (params?: GetAllMemosReqDto) => {
  const { data } = await get<Memo[]>(`memo`, { params });
  return data;
};

export const getOneMemoById = async (id: number) => {
  const { data } = await get<Memo>(`memo/${id}`);
  return data;
};

export const createMemo = async (createMemoReqDto: CreateMemoReqDto) => {
  const { data } = await post<Memo>(`memo`, createMemoReqDto);
  return data;
};

export const deleteMemo = async (id: number) => {
  const { data } = await deleteCall<Memo>(`memo/${id}`);
  return data;
};

export interface UpdateMemoReqDto {
  title?: string;
  content?: string;
  isChecked?: boolean;
  isBookmarked?: boolean;
  color?: string;
  projectId?: number;
}
export const updateMemo = async (
  id: number,
  updateMemoReqDto: UpdateMemoReqDto,
) => {
  const { data } = await patch<Memo>(`memo/${id}`, updateMemoReqDto);
  return data;
};
