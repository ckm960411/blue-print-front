import { get } from "@/app/api/axios";
import { DateTime } from "@/utils/types";
import { MonthlyBudget } from "@/utils/types/money";
import { format } from "date-fns";

export const getMonthlyBudget = async (date: DateTime) => {
  const dateToFind = format(new Date(date), "yyyy-MM-dd");

  const { data } = await get<MonthlyBudget | null>(`money/budget/monthly`, {
    params: { date: dateToFind },
  });
  return data;
};
