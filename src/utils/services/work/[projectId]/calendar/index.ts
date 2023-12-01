import { get } from "@/app/api/axios";
import { ColorKey } from "@/utils/common/color";
import { DateTime, Priority, Progress } from "@/utils/types";

export interface GetThisMonthWorksReqDto {
  projectId: number;
  year?: number;
  month?: number;
}

export interface CalendarMilestone {
  milestoneId: number;
  taskId: null;
  title: string;
  unicode: string;
  progress: Progress;
  color: ColorKey;
  priority: Priority;
  startAt: DateTime;
  endAt: DateTime;
}
export interface CalendarTask {
  milestoneId: null;
  taskId: number;
  title: string;
  unicode: null;
  progress: Progress;
  color: ColorKey;
  priority: Priority;
  startAt: DateTime;
  endAt: DateTime;
}
export type CalendarWork = CalendarMilestone | CalendarTask;

export const getThisMonthWorks = async ({
  projectId,
  ...params
}: GetThisMonthWorksReqDto) => {
  const { data } = await get<CalendarWork[]>(`work/${projectId}/calendar`, {
    params,
  });
  return data;
};
