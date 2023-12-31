"use client";

import SpaceY from "@/components/common/SpaceY";
import ExpenditureList from "@/components/money/expenditure/ExpenditureList";
import ExpenditureTypeSelect from "@/components/money/expenditure/ExpenditureTypeSelect";
import React, { useState } from "react";

export const ALL_EXPENDITURE = "전체 내역";

interface ExpenditureListContainerProps {
  year: number;
  month: number;
}
export default function ExpenditureListContainer({
  year,
  month,
}: Readonly<ExpenditureListContainerProps>) {
  const [expenditureType, setExpenditureType] =
    useState<string>(ALL_EXPENDITURE);

  return (
    <div>
      <ExpenditureTypeSelect
        expenditureType={expenditureType}
        onSelect={setExpenditureType}
      />
      <SpaceY height={16} />
      <ExpenditureList
        expenditureType={expenditureType}
        year={year}
        month={month}
      />
    </div>
  );
}
