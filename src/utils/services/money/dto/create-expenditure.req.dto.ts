import { SpendingType } from "@/utils/types/money";

export interface CreateExpenditureReqDto {
  type: "INCOME" | "SPENDING";
  spendingType?: SpendingType;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  content: string;
  price: number;
  monthlyBudgetCategoryId?: number;
  budgetCategoryId?: number;
}
