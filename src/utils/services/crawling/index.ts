import { get } from "@/app/api/axios";

export interface MetaData {
  faviconLink: string | null;
  metaTags: Record<string, string>;
}
export const getMetaDataByUrl = async (url: string) => {
  try {
    const { data } = await get<MetaData>(`/api/crawling?url=${url}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
