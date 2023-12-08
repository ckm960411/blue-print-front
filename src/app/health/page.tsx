"use client";

import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";
import HealthMonthlyExercise from "@/components/health/HealthMonthlyExercise";
import HealthMonthlyCalendar from "@/components/health/HealthMonthlyCalendar";
import HealthWeight from "@/components/health/HealthWeight";

export default function HealthPage() {
  return (
    <section>
      <HealthDaySelect />
      <HealthDashboard />
      <HealthMonthlyExercise />
      <HealthWeight />
      <HealthMonthlyCalendar />
    </section>
  );
}
