"use client";

import HealthPageHeader from "@/components/health/HealthPageHeader";
import HealthWeekDays from "@/components/health/HealthWeekDays";
import { startOfToday } from "date-fns";
import { useState } from "react";

export default function HealthPage() {
  const [thisDate, setThisDate] = useState(startOfToday());

  return (
    <section>
      <HealthPageHeader />
      <div className="mx-auto max-w-[1280px] p-16px">
        <HealthWeekDays thisDate={thisDate} setThisDate={setThisDate} />
      </div>
    </section>
  );
}
