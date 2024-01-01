interface AddCategoryBudgetButtonProps {
  onClick: () => void;
}
export default function AddCategoryBudgetButton({
  onClick,
}: AddCategoryBudgetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-10px bg-main p-16px text-16px font-bold text-white shadow-lg"
    >
      예산 추가하기
    </button>
  );
}
