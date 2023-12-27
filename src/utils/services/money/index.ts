import { get, patch, post } from "@/app/api/axios";
import { CreateMonthlyBudgetReqDto } from "@/utils/services/money/create-monthly-budget.req.dto";
import { CreateBudgetCategoryReqDto } from "@/utils/services/money/dto/create-budget-category.req.dto";
import { UpdateMonthlyBudgetReqDto } from "@/utils/services/money/update-monthly-budget.req.dto";
import { DateTime } from "@/utils/types";
import {
  BudgetCategory,
  MonthlyBudget,
  MonthlyBudgetCategory,
} from "@/utils/types/money";
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

export const createBudgetCategory = async (
  createBudgetCategoryReqDto: CreateBudgetCategoryReqDto,
) => {
  const { data } = await post<BudgetCategory>(
    `money/budget/category`,
    createBudgetCategoryReqDto,
  );
  return data;
};

export const getAllMonthlyBudgetCategoreis = async (
  monthlyBudgetId: number,
) => {
  const { data } = await get<MonthlyBudgetCategory[]>(
    `money/budget/category/monthly`,
    { params: { monthlyBudgetId } },
  );
  return data;
};
