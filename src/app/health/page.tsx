"use client";

import HealthDailyExercises from "@/components/health/HealthDailyExercises";
import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";
import HealthMonthlyExercise from "@/components/health/HealthMonthlyExercise";
import HealthMonthlyCalendar from "@/components/health/HealthMonthlyCalendar";
import HealthWeight from "@/components/health/HealthWeight";
import { useRedirectIfNoToken } from "@/utils/common/user/useRedirectIfNoToken";

export default function HealthPage() {
  useRedirectIfNoToken();

  return (
    <section>
      <HealthDaySelect />
      <HealthDashboard />
      <HealthMonthlyExercise />
      <HealthWeight />
      <HealthMonthlyCalendar />
      <HealthDailyExercises />
    </section>
  );
}
