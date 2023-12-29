import { ALL_EXPENDITURE } from "@/components/money/expenditure/ExpenditureListContainer";
import { QueryKeys } from "@/utils/common/query-keys";
import { getMonthlyExpenditures } from "@/utils/services/money";
import React from "react";
import { useQuery } from "react-query";

interface ExpenditureListProps {
  expenditureType: string;
  year: number;
  month: number;
}
export default function ExpenditureList({
  expenditureType,
  year,
  month,
}: Readonly<ExpenditureListProps>) {
  const { data } = useQuery(
    QueryKeys.getMonthlyExpenditures(year, month, expenditureType),
    () =>
      getMonthlyExpenditures({
        year,
        month,
        category: expenditureType === ALL_EXPENDITURE ? "" : expenditureType,
      }),
    {
      onSuccess: console.log,
      onError: console.error,
    },
  );

  return (
    <div>
      <div className="flex-between border-b border-gray-200 py-6px">
        <div className="flex items-center gap-12px">
          <span className="text-24px font-bold text-red-500">26</span>
          <div className="flex flex-col gap-4px text-12px">
            <span>2023.12</span>
            <span>일요일</span>
          </div>
        </div>
        <div className="flex-center gap-8px text-14px font-medium">
          <span className="text-blue-500">nnn,nnn원</span>
          <span className="w-80px text-end text-red-500">nn,nnn원</span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-8px py-6px">
          <div className="w-72px text-12px font-medium text-gray-400">
            교통비
          </div>
          <div className="flex grow flex-col gap-6px">
            <p className="text-14px font-semibold">카카오택시</p>
            <p className="text-12px text-gray-400">오후 7:38</p>
          </div>
          <div className="fotn-medium w-88px text-end text-14px text-red-500">
            nnn,nnn원
          </div>
        </div>
        <div className="flex items-center gap-8px py-6px">
          <div className="w-72px text-12px font-medium text-gray-400">
            교통비
          </div>
          <div className="flex grow flex-col gap-6px">
            <p className="text-14px font-semibold">카카오택시</p>
            <p className="text-12px text-gray-400">오후 7:38</p>
          </div>
          <div className="fotn-medium w-88px text-end text-14px text-red-500">
            nnn,nnn원
          </div>
        </div>
      </div>
    </div>
  );
}
