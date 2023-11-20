import { get } from "@/app/api/axios";
import { WorkTab } from "@/app/work/page";

export type WorkCount = Record<WorkTab, number>;
export const getWorkCountByProjectId = async (projectId: number) => {
  const { data } = await get<WorkCount>(`work/${projectId}/count`);
  return data;
};
