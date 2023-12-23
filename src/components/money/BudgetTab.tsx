import CategoryBudgetSection from "@/components/money/budget/CategoryBudgetSection";
import MonthlyBudget from "@/components/money/budget/MonthlyBudget";

export default function BudgetTab() {
  return (
    <div>
      <MonthlyBudget />
      <hr className="my-32px" />
      <CategoryBudgetSection />
    </div>
  );
}
