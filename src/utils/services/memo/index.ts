import { get, post } from "@/app/api/axios";
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
