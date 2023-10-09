import { getDay } from "date-fns";

export const Z_INDEX = {
  HEADER: 100,
};

export const getDayByAsiaSeoulFormat = (date: Date) => {
  return ["일", "월", "화", "수", "목", "금", "토"][getDay(new Date(date))];
};
