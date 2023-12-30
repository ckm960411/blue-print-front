import { ExpenditureType } from "@/utils/types/money";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

const expenditureTypeKorean = {
  [ExpenditureType.SPENDING]: "지출",
  [ExpenditureType.INCOME]: "수입",
} as const;

interface CreateExpenditureTypeRadioProps {
  type: ExpenditureType;
  onChange: (type: ExpenditureType) => void;
}
export default function CreateExpenditureTypeRadio({
  type,
  onChange,
}: Readonly<CreateExpenditureTypeRadioProps>) {
  return (
    <div>
      <RadioGroup
        value={type}
        onChange={(type) => onChange(type as ExpenditureType)}
      >
        <Stack direction="row" gap={8}>
          {Object.values(ExpenditureType).map((type) => {
            return (
              <Radio key={type} value={type}>
                {expenditureTypeKorean[type]}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </div>
  );
}
