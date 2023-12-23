import CategoryBudget from "@/components/money/budget/CategoryBudget";
import MontlyBudget from "@/components/money/budget/MontlyBudget";

export default function BudgetTab() {
  return (
    <div>
      <MontlyBudget />
      <hr className="my-32px" />
      <CategoryBudget />
    </div>
  );
}
