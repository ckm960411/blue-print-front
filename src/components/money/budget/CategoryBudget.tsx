import CategoryBudgetContainer from "@/components/money/budget/CategoryBudgetContainer";
import CategoryBudgetHeader from "@/components/money/budget/CategoryBudgetHeader";
import SpaceY from "@/components/common/SpaceY";

export default function CategoryBudget() {
  return (
    <div>
      <CategoryBudgetHeader />

      <SpaceY height={32} />

      <CategoryBudgetContainer />

      <SpaceY height={32} />
      <div>
        <button className="w-full rounded-10px bg-main p-16px text-16px font-bold text-white shadow-lg">
          예산 추가하기
        </button>
      </div>
    </div>
  );
}
