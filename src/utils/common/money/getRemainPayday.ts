import {
  differenceInDays,
  getMonth,
  getYear,
  isBefore,
  isWeekend,
  addDays,
  addMonths,
} from "date-fns";

export const getRemainPayday = (
  year = getYear(new Date()),
  month = getMonth(new Date()) + 1,
): number => {
  const now = new Date();

  const is15DayWeekend = isWeekend(new Date(year, month - 1, 15));

  let payday: Date;
  // 15일이 평일이라면 15일 반환
  if (!is15DayWeekend) {
    payday = new Date(year, month - 1, 15);
  } else {
    // 15일이 주말이라면 14일을, 14일도 주말이라면 13일 반환
    const is14DayWeekend = isWeekend(new Date(year, month - 1, 14));
    if (is14DayWeekend) {
      payday = new Date(year, month - 1, 13);
    } else {
      payday = new Date(year, month - 1, 14);
    }
  }

  if (isBefore(now, payday)) {
    return differenceInDays(payday, addDays(now, -1));
  }

  const nextYearAndMonth = addMonths(new Date(year, month - 1, 1), 1);
  return getRemainPayday(
    getYear(nextYearAndMonth),
    getMonth(nextYearAndMonth) + 1,
  );
};
