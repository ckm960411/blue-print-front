import { get, patch, post } from "@/app/api/axios";
import { CreateMonthlyBudgetReqDto } from "@/utils/services/money/create-monthly-budget.req.dto";
import { UpdateMonthlyBudgetReqDto } from "@/utils/services/money/update-monthly-budget.req.dto";
import { DateTime } from "@/utils/types";
import { BudgetCategory, MonthlyBudget } from "@/utils/types/money";
import { format } from "date-fns";
import { omit } from "lodash";

export const getMonthlyBudget = async (date: DateTime) => {
  const dateToFind = format(new Date(date), "yyyy-MM-dd");

  const { data } = await get<MonthlyBudget | null>(`money/budget/monthly`, {
    params: { date: dateToFind },
  });
  return data;
};

export const createMonthlyBudget = async (
  createMonthlyBudgetReqDto: CreateMonthlyBudgetReqDto,
) => {
  const { data } = await post<MonthlyBudget>(
    `money/budget/monthly`,
    createMonthlyBudgetReqDto,
  );
  return data;
};

export const updateMonthlyBudget = async (
  updateMonthlyBudgetReqDto: UpdateMonthlyBudgetReqDto,
) => {
  const { data } = await patch(
    `money/budget/monthly/${updateMonthlyBudgetReqDto.id}`,
    omit(updateMonthlyBudgetReqDto, "id"),
  );
  return data;
};

export const getAllBudgetCategories = async () => {
  const { data } = await get<BudgetCategory[]>(`money/budget/category`);
  return data;
};
