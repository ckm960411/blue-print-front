"use client";

import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";
import HealthMonthlyExercise from "@/components/health/HealthMonthlyExercise";

export default function HealthPage() {
  return (
    <section>
      <HealthDaySelect />
      <HealthDashboard />
      <HealthMonthlyExercise />
    </section>
  );
}
