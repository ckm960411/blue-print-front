export const getMonthlyExerciseMedal = (count: number) => {
  if (count <= 3) return "🥉";
  if (count <= 6) return "🥈";
  if (count <= 9) return "🥇";
  if (count <= 12) return "🏅";
  if (count <= 15) return "🎖️";
  if (count > 15) return "🏵️";
};
