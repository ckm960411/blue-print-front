import { deleteCall, get, patch, post } from "@/app/api/axios";
import { CreateMemoReqDto } from "@/utils/services/memo/dto/create-memo.req.dto";
import { Memo } from "@/utils/types/memo";

export const getAllMemos = async () => {
  const { data } = await get<Memo[]>(`memo`);
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
}
export const updateMemo = async (
  id: number,
  updateMemoReqDto: UpdateMemoReqDto,
) => {
  const { data } = await patch<Memo>(`memo/${id}`, updateMemoReqDto);
  return data;
};

export const bookmarkMemo = async (id: number, bookmark: boolean) => {
  const { data } = await patch<Memo>(`memo/bookmark/${id}`, { bookmark });
  return data;
};

export const checkMemo = async (id: number, check: boolean) => {
  const { data } = await patch<Memo>(`memo/check/${id}`, { check });
  return data;
};
