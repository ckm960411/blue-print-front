export const getMonthlyExerciseMedal = (count: number) => {
  if (count <= 3) return { medal: "🥉", maxStep: 3 };
  if (count <= 6) return { medal: "🥈", maxStep: 6 };
  if (count <= 9) return { medal: "🥇", maxStep: 9 };
  if (count <= 12) return { medal: "🏅", maxStep: 12 };
  if (count <= 15) return { medal: "🎖️", maxStep: 15 };
  return { medal: "🏵️", maxStep: null };
};
