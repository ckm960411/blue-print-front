"use client";

import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";
import HealthMonthly from "@/components/health/HealthMonthly";

export default function HealthPage() {
  return (
    <section>
      <HealthDaySelect />
      <HealthDashboard />
      <HealthMonthly />
    </section>
  );
}
