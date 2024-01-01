import NumberInputController from "@/components/components/NumberInputController";
import React from "react";

interface CreateExpenditurePriceProps {
  price: number;
  onChange: (value: number) => void;
}
export default function CreateExpenditurePrice({
  price,
  onChange,
}: Readonly<CreateExpenditurePriceProps>) {
  return (
    <div className="flex items-center gap-8px">
      <span className="w-40px text-16px font-bold">금액 : </span>
      <NumberInputController
        value={price}
        onChange={(_, value) => onChange(value || 0)}
        width={32}
      />
      <span>원</span>
    </div>
  );
}
