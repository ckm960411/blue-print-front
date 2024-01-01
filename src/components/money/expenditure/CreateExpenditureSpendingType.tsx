import { SpendingType } from "@/utils/types/money";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

const spendingTypeKorean = {
  [SpendingType.CARD]: "카드",
  [SpendingType.CASH]: "현금",
} as const;

interface CreateExpenditureSpendingTypeProps {
  spendingType: SpendingType;
  onChange: (value: SpendingType) => void;
}
export default function CreateExpenditureSpendingType({
  spendingType,
  onChange,
}: Readonly<CreateExpenditureSpendingTypeProps>) {
  return (
    <div className="flex items-center gap-8px">
      <span className="w-40px text-16px font-bold">수단 : </span>
      <RadioGroup
        value={spendingType}
        onChange={(type) => onChange(type as SpendingType)}
      >
        <Stack direction="row" gap={4}>
          {Object.values(SpendingType).map((type) => {
            return (
              <Radio key={type} value={type}>
                {spendingTypeKorean[type]}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </div>
  );
}
