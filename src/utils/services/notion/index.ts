import { get } from "@/app/api/axios";
import { GetBlockListResDto, GetPageResDto } from "@/utils/types/notion";
import { CategorySection } from "@/utils/types/study";

export const getPagesData = async (pageIds: string[]) => {
  const { data } = await get<GetPageResDto[]>(`notion/pages`, {
    params: { ids: pageIds },
  });
  return data;
};

export const getNotionSections = async () => {
  const { data } = await get<CategorySection[]>(`notion/study`);
  return data;
};

export const getNotionPageById = async (pageId: string) => {
  const { data } = await get<GetPageResDto>(`notion/pages/${pageId}`);
  return data;
};

export const getNotionBlockList = async (
  blockId: string,
  params?: { start_cursor?: string; page_size?: number },
) => {
  const { data } = await get<GetBlockListResDto>(
    `notion/blocks/${blockId}/children`,
    { params },
  );
  return data;
};
