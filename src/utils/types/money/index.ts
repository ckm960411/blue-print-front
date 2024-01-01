import { DateTime } from "@/utils/types";

export enum MonthlyBudgetType {
  SUM = "SUM",
  SPECIFIED = "SPECIFIED",
}
export interface MonthlyBudget {
  id: number;
  userId: number;
  year: number;
  month: number;
  type: MonthlyBudgetType;
  budget: number; // default: 0
  start: DateTime;
  end: DateTime;
}

export interface BudgetCategory {
  id: number;
  name: string;
  unicode: string;
  userId: number;
}

export interface MonthlyBudgetCategory {
  id: number;
  budgetCategoryId: number;
  budget: number;
  monthlyBudgetId: number;
  userId: number;
  year: number;
  month: number;
  start: DateTime;
  end: DateTime;
  categoryName: string;
  categoryUnicode: string;
  expenditures: Expenditure[];
  spent: number;
}

export enum ExpenditureType {
  INCOME = "INCOME",
  SPENDING = "SPENDING",
}

export interface Expenditure {
  id: number;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  type: ExpenditureType;
  content: string;
  price: number;
  createdAt: Date;
  userId: number;
  monthlyBudgetCategoryId: number;
  budgetCategoryId: number;
  budgetCategoryName: string;
  budgetCategoryUnicode: string;
}

export interface DailyExpenditure {
  date: DateTime;
  income: number;
  spending: number;
  data: Expenditure[];
}
