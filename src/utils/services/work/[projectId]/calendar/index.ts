import { get } from "@/app/api/axios";

export interface GetThisMonthWorksReqDto {
  projectId: number;
  year?: number;
  month?: number;
}
export const getThisMonthWorks = async ({
  projectId,
  ...params
}: GetThisMonthWorksReqDto) => {
  const { data } = await get(`work/${projectId}/calendar`, { params });
  return data;
};
