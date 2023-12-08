"use client";

import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";

export default function HealthPage() {
  return (
    <section>
      <HealthDaySelect />
      <HealthDashboard />
    </section>
  );
}
