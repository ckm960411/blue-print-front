import { MonthlyBudget } from "@/utils/types/money";

export class MonthlyBudgetPolicy {
  monthlyBudget: MonthlyBudget;

  constructor(monthlyBudget: MonthlyBudget) {
    this.monthlyBudget = monthlyBudget;
  }
}
