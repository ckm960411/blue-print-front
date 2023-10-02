import { API_BASE_URL } from "..";

export interface MetaData {
  faviconLink: string | null;
  metaTags: Record<string, string>;
}
export const getMetaDataByUrl = async (url: string) => {
  try {
    const data = await fetch(`${API_BASE_URL}/api/crawling?url=${url}`).then(
      (res) => res.json(),
    );
    return data as MetaData;
  } catch (error) {
    console.error(error);
  }
};
