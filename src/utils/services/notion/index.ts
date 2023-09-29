import { get } from "@/app/api/axios";
import { GetBlockListResDto, GetPageResDto } from "@/utils/types/notion";
import { CategorySection } from "@/utils/types/study";

export const getNotionSections = async () => {
  const { data } = await get<CategorySection[]>("api/notion/pages");
  return data;
};

export const getNotionPageById = async (pageId: string) => {
  const { data } = await get<GetPageResDto>(`/api/notion/pages/${pageId}`);
  return data;
};

export const getNotionBlockList = async (blockId: string) => {
  const { data } = await get<GetBlockListResDto>(
    `/api/notion/blocks/${blockId}`,
  );
  return data;
};
