import { GetBlockListResDto, GetPageResDto } from "@/utils/types/notion";
import { CategorySection } from "@/utils/types/study";
import { API_BASE_URL } from "..";

export const getNotionSections = async () => {
  const data = await fetch(`${API_BASE_URL}/api/notion/pages`).then((res) =>
    res.json(),
  );
  return data as CategorySection[];
};

export const getNotionPageById = async (pageId: string) => {
  const data = await fetch(`${API_BASE_URL}/api/notion/pages/${pageId}`)
    .then((res) => res.json())
    .catch(console.error);
  return data as GetPageResDto;
};

export const getNotionBlockList = async (blockId: string) => {
  const data = await fetch(`${API_BASE_URL}/api/notion/blocks/${blockId}`).then(
    (res) => res.json(),
  );
  return data as GetBlockListResDto;
};
