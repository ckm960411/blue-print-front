"use client";

import CreateExerciseModal from "@/components/health/create/CreateExerciseModal";
import HealthDailyExercises from "@/components/health/HealthDailyExercises";
import HealthDashboard from "@/components/health/HealthDashboard";
import HealthDaySelect from "@/components/health/HealthDaySelect";
import HealthMonthlyExercise from "@/components/health/HealthMonthlyExercise";
import HealthMonthlyCalendar from "@/components/health/HealthMonthlyCalendar";
import HealthWeight from "@/components/health/HealthWeight";
import { useRedirectIfNoToken } from "@/utils/common/user/useRedirectIfNoToken";
import { useDisclosure } from "@chakra-ui/hooks";

export default function HealthPage() {
  useRedirectIfNoToken();
  const {
    isOpen: isOpenExerciseModal,
    onOpen: openExerciseModal,
    onClose: closeExerciseModal,
  } = useDisclosure();

  return (
    <section>
      <CreateExerciseModal
        isOpen={isOpenExerciseModal}
        onClose={closeExerciseModal}
      />

      <HealthDaySelect />
      <HealthDashboard openExerciseModal={openExerciseModal} />
      <HealthMonthlyExercise />
      <HealthWeight />
      <HealthMonthlyCalendar />
      <HealthDailyExercises />
    </section>
  );
}
