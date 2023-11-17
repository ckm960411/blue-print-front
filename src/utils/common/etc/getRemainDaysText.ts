import { DateTime } from "@/utils/types";
import { differenceInDays, startOfToday } from "date-fns";

export interface RemainDaysData {
  remainDays: number;
  remainDaysText: string;
}
export const getRemainDaysText = (
  endAt: DateTime | null,
): RemainDaysData | null => {
  if (!endAt) return null;

  const remainDays = differenceInDays(new Date(endAt), startOfToday());

  let remainDaysText: string;

  if (remainDays === 0) {
    remainDaysText = "오늘";
  } else {
    remainDaysText =
      remainDays > 0 ? `${remainDays}일 남음` : `${-remainDays}일 지남`;
  }

  return {
    remainDays,
    remainDaysText,
  };
};
