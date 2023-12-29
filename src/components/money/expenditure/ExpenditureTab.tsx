"use client";

import ExpenditureListContainer from "@/components/money/expenditure/ExpenditureListContainer";
import ExpenditureMonthlyHeader from "@/components/money/expenditure/ExpenditureMonthlyHeader";
import { getMonth, getYear } from "date-fns";
import { useState } from "react";

export default function ExpenditureTab() {
  const [year, setYear] = useState(getYear(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  const handleChangeDate = (type: "prev" | "next") => {
    if (type === "prev") {
      if (month !== 1) return setMonth((prev) => prev - 1);
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      if (month !== 12) return setMonth((prev) => prev + 1);
      setYear((prev) => prev + 1);
      setMonth(1);
    }
  };

  return (
    <div>
      <ExpenditureMonthlyHeader
        year={year}
        month={month}
        onChangeDate={handleChangeDate}
      />
      <hr className="my-24px" />
      <ExpenditureListContainer />
    </div>
  );
}
