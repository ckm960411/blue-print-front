import { deleteCall, get, patch, post } from "@/app/api/axios";
import { CreateExpenditureReqDto } from "@/utils/services/money/dto/create-expenditure.req.dto";
import { CreateMonthlyBudgetReqDto } from "@/utils/services/money/dto/create-monthly-budget.req.dto";
import { CreateBudgetCategoryReqDto } from "@/utils/services/money/dto/create-budget-category.req.dto";
import { CreateMonthlyBudgetCategoryReqDto } from "@/utils/services/money/dto/create-monthly-budget-category.req.dto";
import { UpdateMonthlyBudgetReqDto } from "@/utils/services/money/dto/update-monthly-budget.req.dto";
import { DateTime } from "@/utils/types";
import {
  BudgetCategory,
  DailyExpenditure,
  MonthlyBudget,
  MonthlyBudgetCategory,
} from "@/utils/types/money";
import { format } from "date-fns";
import { omit } from "lodash";

export const getBalance = async () => {
  const { data } = await get<{ balance: number }>(`money/balance`);
  return data;
};

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

export const updateBudgetCategory = async (
  dto: Partial<CreateBudgetCategoryReqDto> & { categoryId: number },
) => {
  const { data } = await patch<BudgetCategory>(
    `money/budget/category/${dto.categoryId}`,
    omit(dto, "categoryId"),
  );
  return data;
};

export const deleteBudgetCategory = async (id: number) => {
  const { data } = await deleteCall<BudgetCategory>(
    `money/budget/category/${id}`,
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

export const createMontlyBudgetCategory = async (
  body: CreateMonthlyBudgetCategoryReqDto,
) => {
  const { data } = await post<MonthlyBudgetCategory>(
    `money/budget/category/monthly`,
    body,
  );
  return data;
};

export const getTotalMonthlyExpenditure = async (params?: {
  year: number;
  month: number;
}) => {
  const { data } = await get<{ income: number; spending: number }>(
    `money/expenditure/monthly`,
    { params },
  );
  return data;
};

export const createExpenditure = async (body: CreateExpenditureReqDto) => {
  const { data } = await post(`money/expenditure`, body);
  return data;
};

export const getMonthlyExpenditures = async (params?: {
  year: number;
  month: number;
  category: string;
}) => {
  const { data } = await get<DailyExpenditure[]>(`money/expenditure`, {
    params,
  });
  return data;
};

export const getMonthlySpending = async (year: number, month: number) => {
  const { data } = await get<{ monthly: number; daily: number }>(
    `money/expenditure/${year}/${month}`,
  );
  return data;
};
