import { getWeights } from "@/utils/services/health";
import { useQuery } from "react-query";

enum WeightState {
  INCREASED = "INCREASED",
  DECREASED = "DECREASED",
  NONE = "NONE",
}

export default function HealthWeight() {
  const { data: weightData } = useQuery(["getWeights"], getWeights, {
    onError: console.error,
  });

  if (!weightData) return <></>;

  const { monthAgo, weekAgo, today } = weightData;

  const getWeightState = (
    before: number | undefined,
    after: number | undefined,
  ) => {
    if (!before || !after) return WeightState.NONE;
    if (before > after) return WeightState.DECREASED;
    if (before < after) return WeightState.INCREASED;
    return WeightState.NONE;
  };

  const getWeightStateClassName = (
    before: number | undefined,
    after: number | undefined,
  ) => {
    const weightState = getWeightState(before, after);
    if (weightState === WeightState.INCREASED) return "text-red-500";
    if (weightState === WeightState.DECREASED) return "text-blue-500";
    return "text-gray-800";
  };

  return (
    <div className="px-16px pb-16px">
      <div className="rounded-md shadow-md">
        <div className="p-16px">
          <p className="text-14px font-bold text-main">📉 체중</p>
          <div className="mt-16px grid grid-cols-3 gap-8px text-14px font-medium">
            <div className="flex-center flex-col gap-8px">
              <p>한달 전</p>
              <p className="text-gray-600">
                {monthAgo ? `${monthAgo} kg` : "없음"}
              </p>
            </div>
            <div className="flex-center flex-col gap-8px">
              <p>일주일 전</p>
              <p className={getWeightStateClassName(monthAgo, weekAgo)}>
                {weekAgo ? `${weekAgo} kg` : "없음"}
              </p>
            </div>
            <div className="flex-center flex-col gap-8px">
              <p>오늘</p>
              <p className={getWeightStateClassName(weekAgo, today)}>
                {today ? `${today} kg` : "없음"}
              </p>
            </div>
          </div>
        </div>
        <button className="w-full border-t border-gray-200 p-12px text-14px font-medium text-main">
          체중 추가
        </button>
      </div>
    </div>
  );
}
