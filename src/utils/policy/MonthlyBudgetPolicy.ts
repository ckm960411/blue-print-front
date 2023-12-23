import { MonthlyBudget } from "@/utils/types/money";
import { differenceInDays, format, startOfDay } from "date-fns";

export class MonthlyBudgetPolicy {
  monthlyBudget: MonthlyBudget;
  totalCategoryBudgets: number; // 카테고리별 예산 총액

  constructor(monthlyBudget: MonthlyBudget, totalCategoryBudgets: number) {
    this.monthlyBudget = monthlyBudget;
    this.totalCategoryBudgets = totalCategoryBudgets;
  }

  get startDate() {
    const start = new Date(this.monthlyBudget.start);
    return format(start, "M월 d일");
  }

  get endDate() {
    const end = new Date(this.monthlyBudget.end);
    return format(end, "M월 d일");
  }

  /** 그 달의 일수 */
  get dayLength() {
    const start = new Date(this.monthlyBudget.start);
    const end = new Date(this.monthlyBudget.end);
    // end까지가 아닌 그다음달 start 를 기준으로 잡아야하므로 +1해준다
    return differenceInDays(end, start) + 1;
  }

  /** 그 달에서 오늘까지 일수 */
  get dayLengthTilToday() {
    // 시작일을 포함해서 오늘까지 일수를 하려면 differenceInDays 에 +1을 해주어야 함
    // 추가로 오늘의 예산을 더해주어야 하므로 +1을 더해줌
    const start = new Date(this.monthlyBudget.start);
    return differenceInDays(startOfDay(new Date()), start) + 2;
  }

  /**
   * 총 한달 예산 (SUM이면 카테고리별 예산총액 아니라면 직접 정한 예산)
   */
  get totalBudget() {
    if (this.monthlyBudget.type === "SUM") {
      return this.totalCategoryBudgets;
    } else {
      return this.monthlyBudget.budget;
    }
  }

  /**
   * 그 달의 하루 권장 하루예산 반환
   * - 총예산을 총 이달 일수만큼 나눔
   */
  get dailyBudget() {
    return Math.round(this.totalBudget / this.dayLength);
  }

  /**
   * 그 달의 오늘까지 권장 하루예산
   * - 하루예산을 오늘까지 일수만큼 곱함
   * @param totalCategoryBudgets 카테고리별 예산 총액
   */
  getDailyBudgetTillToday(totalCategoryBudgets = 0) {
    return this.dailyBudget * this.dayLengthTilToday;
  }
}
