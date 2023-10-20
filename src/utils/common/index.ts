import { DateTime } from "@/utils/types";
import { getDay } from "date-fns";

export const Z_INDEX = {
  HEADER: 100,
} as const;

export const getDayByAsiaSeoulFormat = (date: DateTime) => {
  return ["일", "월", "화", "수", "목", "금", "토"][getDay(new Date(date))];
};
