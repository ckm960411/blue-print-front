import { get } from "@/app/api/axios";
import { PageIdAndUrl } from "@/app/api/notion/pages/route";
import { GetPageResDto } from "@/utils/types/notion";

export const getNotionPageIdAndUrls = async () => {
  const { data } = await get<PageIdAndUrl[]>("api/notion/pages");
  return data;
};

export const getNotionPageById = async (pageId: string) => {
  const { data } = await get<GetPageResDto>(`/api/notion/pages/${pageId}`);
  return data;
};
