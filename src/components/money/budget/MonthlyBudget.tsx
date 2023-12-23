"use client";

import { getMonthlyBudget } from "@/utils/services/money";
import { format } from "date-fns";
import { isUndefined } from "lodash";
import { useQuery } from "react-query";

export default function MonthlyBudget() {
  const dateToFind = format(new Date(), "yyyy-MM-dd");

  const { data: monthlyBudget } = useQuery(
    ["getMonthlyBudget", dateToFind],
    () => getMonthlyBudget(dateToFind),
    { onError: console.error },
  );

  if (isUndefined(monthlyBudget)) {
    return <></>;
  }

  if (!monthlyBudget) {
    return <div>no monthlyBudget</div>;
  }

  console.log("monthlyBudget", monthlyBudget);

  return (
    <div>
      <div className="flex flex-col gap-12px">
        <div className="flex-between">
          <p className="text-16px font-bold">한달 예산</p>
          <button className="p-2px text-14px font-bold text-main">
            예산 설정
          </button>
        </div>
        <p className="text-22px font-bold">316,693원 남음</p>
        <div className="text-14px leading-[140%] text-gray-500">
          <p>하루 예산 14,395원</p>
          <p>
            <span className="font-medium text-red-400">12,240원</span>{" "}
            초과됐어요! 조금만 더 아껴봐요
          </p>
        </div>
      </div>
      <div className="relative pb-20px pt-60px">
        <div className="absolute left-[calc(30%-22px)] top-24px rounded-2xl border border-gray-200 px-8px py-4px text-14px font-medium">
          <span>권장</span>
          <div className="absolute left-1/2 top-full h-12px w-1px translate-x-[-50%] border border-dashed border-gray-600"></div>
        </div>
        <div className="h-40px overflow-hidden rounded-xl bg-gray-100">
          <div className="h-full w-[30%] bg-main" />
        </div>
        <div className="absolute bottom-0 left-[-8px] text-12px font-medium">
          15일
        </div>
        <div className="absolute bottom-0 right-[-8px] text-12px font-medium">
          15일
        </div>
      </div>
      <div className="mt-16px flex flex-col gap-16px text-16px">
        <div className="flex-between">
          <p className="font-medium text-gray-600">💰총 예산</p>
          <p className="font-bold">500,000원</p>
        </div>
        <div className="flex-between">
          <p className="font-medium text-gray-600">💵오늘까지 권장 지출</p>
          <p className="font-bold">161,290원</p>
        </div>
        <div className="flex-end text-12px text-gray-600">
          💸 <span className="font-medium text-red-400">24,400원</span>이
          초과됐어요
        </div>
      </div>
    </div>
  );
}
