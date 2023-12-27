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
}
