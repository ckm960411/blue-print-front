import { DateTime } from "@/utils/types";

enum MonthlyBudgetType {
  SUM = "SUM",
  SPECIFIED = "SPECIFIED",
}
export interface MonthlyBudget {
  id: number;
  userId: number;
  year: number;
  month: number;
  type: MonthlyBudgetType;
  start: DateTime;
  end: DateTime;
}
