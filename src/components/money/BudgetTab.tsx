import CategoryBudgetSection from "@/components/money/budget/CategoryBudgetSection";
import MontlyBudget from "@/components/money/budget/MontlyBudget";

export default function BudgetTab() {
  return (
    <div>
      <MontlyBudget />
      <hr className="my-32px" />
      <CategoryBudgetSection />
    </div>
  );
}
