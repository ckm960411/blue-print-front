import { Expenditure, ExpenditureType } from "@/utils/types/money";
import { format } from "date-fns";
import React from "react";

interface ExpenditureCardProps {
  expenditure: Expenditure;
}
export default function ExpenditureCard({
  expenditure,
}: Readonly<ExpenditureCardProps>) {
  return (
    <div className="flex items-center gap-8px py-6px">
      <div className="w-72px text-12px font-medium text-gray-400">
        {expenditure.budgetCategoryName}
      </div>
      <div className="flex grow flex-col gap-6px">
        <p className="text-14px font-semibold">{expenditure.content}</p>
        <p className="text-12px text-gray-400">
          {format(new Date(expenditure.createdAt), "HH:mm")}
        </p>
      </div>
      <div
        className={`fotn-medium w-88px text-end text-14px ${
          expenditure.type === ExpenditureType.INCOME
            ? "text-blue-500"
            : "text-red-500"
        }`}
      >
        {expenditure.price.toLocaleString()}원
      </div>
    </div>
  );
}
