import { useWeeklyExerciseChecked } from "@/utils/hooks/react-query/health/useWeeklyExerciseChecked";

export default function HealthWeeklyChecked() {
  const weeklyChecked = useWeeklyExerciseChecked();

  return (
    <div className="flex items-center gap-8px">
      <span className="grow font-medium">이번 주</span>
      <div className="flex-between gap-16px">
        {weeklyChecked.map((checked, i) => (
          <div
            key={i}
            className="flex-center h-16px w-16px overflow-hidden rounded-full bg-gray-100"
          >
            {checked ? "✅" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
