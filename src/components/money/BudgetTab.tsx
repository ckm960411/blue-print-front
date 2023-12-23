import SpaceY from "@/components/common/SpaceY";
import CategoryBudget from "@/components/money/budget/CategoryBudget";
import MontlyBudget from "@/components/money/budget/MontlyBudget";

export default function BudgetTab() {
  return (
    <div>
      <MontlyBudget />
      <hr className="my-32px" />
      <CategoryBudget />

      <SpaceY height={500} />
    </div>
  );
}
