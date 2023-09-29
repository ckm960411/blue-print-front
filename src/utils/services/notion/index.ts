import { get } from "@/app/api/axios";
import { GetPageResDto } from "@/utils/types/notion";
import { CategorySection } from "@/utils/types/study";

export const getNotionSections = async () => {
  const { data } = await get<CategorySection[]>("api/notion/pages");
  return data;
};

export const getNotionPageById = async (pageId: string) => {
  const { data } = await get<GetPageResDto>(`/api/notion/pages/${pageId}`);
  return data;
};
