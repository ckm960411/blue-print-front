import { MonthlyBudgetType } from "@/utils/types/money";

export interface UpdateMonthlyBudgetReqDto {
  id: number;
  type?: MonthlyBudgetType;
  budget?: number;
}
