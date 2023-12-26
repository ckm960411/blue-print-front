export default function NoMonthlyBudget() {
  return (
    <div className="flex-center flex-col gap-16px py-40px text-center">
      <p className="text-50px">💸</p>
      <p className="text-18px font-bold leading-[140%]">
        이번 달 예산을 아직 책정하지 않았어요!
      </p>
      <p className="whitespace-pre-wrap font-medium text-gray-700">
        돈이 줄줄 새기 전에 현명한 소비를 위해{"\n"}예산을 측정해봅시다!
      </p>
      <button className="w-full rounded-10px bg-main p-16px text-18px font-bold text-white shadow-lg">
        예산 책정하기
      </button>
    </div>
  );
}
