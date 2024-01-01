export interface CreateMonthlyBudgetReqDto {
  year: number;
  month: number;
  type: "SUM" | "SPECIFIED";
  budget?: number;
}
